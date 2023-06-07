import { err, ok, Result } from 'neverthrow'

import DatabaseBootstrap from '../../../bootstrap/database.bootstrap'

import { UserEmailInvalidException, UserNotFoundException } from '../domain/exceptions/user.exception'
import { UserRepository } from '../domain/user.repository'
import User, { UserUpdate } from '../domain/user'
import { EmailVO } from '../domain/value-objects/email.VO'
import { UserEntity } from './user.entity'

export default class UserInfraestructure implements UserRepository {
  async list(): Promise<User[]> {
    const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity)
    const result = await repo.find({ where: { active: true } })
    return result.map((el: UserEntity) => {
      const emailResult = EmailVO.create(el.email)

      if (emailResult.isErr()) {
        throw new UserEmailInvalidException()
      }
      return new User({
        guid: el.guid,
        name: el.name,
        lastname: el.lastname,
        email: emailResult.value,
        password: el.password,
        refreshToken: el.refreshToken,
        active: el.active,
      })
    })
  }
  async listOne(guid: string): Promise<Result<User, UserNotFoundException>> {
    const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity)
    const result = await repo.findOne({ where: { guid } })
    const emailResult = EmailVO.create(result.email)

    if (emailResult.isErr()) {
      return err(new UserEmailInvalidException())
    }

    if (!result) {
      return err(new UserNotFoundException())
    } else {
      return ok(
        new User({
          guid: result.guid,
          name: result.name,
          lastname: result.lastname,
          email: emailResult.value,
          password: result.password,
          refreshToken: result.refreshToken,
          active: result.active,
        }),
      )
    }
  }
  async insert(user: User): Promise<User> {
    const userInsert = new UserEntity()
    const { guid, name, lastname, email, password, refreshToken, active } = user.properties()

    Object.assign(userInsert, {
      guid,
      name,
      lastname,
      email: email.value,
      password,
      refreshToken,
      active,
    })

    await DatabaseBootstrap.dataSource.getRepository(UserEntity).save(userInsert)
    return user
  }
  async update(guid: string, user: Partial<UserUpdate>): Promise<Result<User, UserNotFoundException>> {
    const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity)
    const userFound = await repo.findOne({ where: { guid } })

    if (userFound) {
      Object.assign(userFound, user)
      const UserEntity = await repo.save(userFound)
      const emailResult = EmailVO.create(UserEntity.email)
      if (emailResult.isErr()) {
        return err(new UserEmailInvalidException())
      }
      return ok(
        new User({
          guid: UserEntity.guid,
          name: UserEntity.name,
          lastname: UserEntity.lastname,
          email: emailResult.value,
          password: UserEntity.password,
          refreshToken: UserEntity.refreshToken,
          active: UserEntity.active,
        }),
      )
    }
  }
  async delete(guid: string): Promise<Result<User, UserNotFoundException>> {
    const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity)
    const userFound = await repo.findOne({ where: { guid } })
    if (userFound) {
      userFound.active = false

      const UserEntity = await repo.save(userFound)
      const emailResult = EmailVO.create(UserEntity.email)
      if (emailResult.isErr()) {
        return err(new UserEmailInvalidException())
      }
      return ok(
        new User({
          guid: UserEntity.guid,
          name: UserEntity.name,
          lastname: UserEntity.lastname,
          email: emailResult.value,
          password: UserEntity.password,
          refreshToken: UserEntity.refreshToken,
          active: UserEntity.active,
        }),
      )
    } else {
      return err(new UserNotFoundException())
    }
  }
}
