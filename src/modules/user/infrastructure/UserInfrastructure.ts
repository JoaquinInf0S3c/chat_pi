import { UserRepository } from '../domain/user.repository'
import User from '../domain/users'

export class UserInfraestructure implements UserRepository {
  list(): Promise<User[]> {
    throw new Error('Method not implemented.')
  }
  listOne(guid: string): Promise<User> {
    throw new Error('Method not implemented.')
  }
  insert(user: User): Promise<User> {
    throw new Error('Method not implemented.')
  }
  update(user: User): Promise<User> {
    throw new Error('Method not implemented.')
  }
  delete(guid: string): Promise<User> {
    throw new Error('Method not implemented.')
  }
}
