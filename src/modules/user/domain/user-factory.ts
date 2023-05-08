import { v4 as uuidv4 } from 'uuid'
import User, { UserProperties } from './users'
import { UserPasswordService } from './services/user-password.service'

export default class UserFactory {
  async create(name: string, lastname: string, email: string, password: string) {
    const passwordHash = await UserPasswordService.hash(password)

    const userProperties: UserProperties = {
      name,
      lastname,
      email,
      password: passwordHash,
      guid: uuidv4(),
      refreshToken: uuidv4(),
    }
    const user = new User(userProperties)
    return user
  }
}
