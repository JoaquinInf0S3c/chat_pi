import { IEntity } from '../../shared/entity.interface'
import { EmailVO } from './value-objects/email.VO'

interface UserRequired {
  // Definimos los campos requeridos para crear un usuario
  name: string
  lastname: string
  email: EmailVO
  password: string
}

interface UserOptional {
  // Campos que se crean automáticamente
  active: boolean
  guid: string
  refreshToken: string
}

export interface UserUpdate {
  name: string
  lastname: string
  password: string
}

export type UserProperties = Required<UserRequired> & Partial<UserOptional>

export default class User implements IEntity<UserProperties, UserUpdate> {
  private name: string
  private lastname: string
  private readonly email: EmailVO
  private password: string
  private active: boolean
  private readonly guid: string
  private refreshToken: string

  constructor(userProperties: UserProperties) {
    this.active = true
    Object.assign(this, userProperties)
  }

  properties(): UserProperties {
    return {
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      active: this.active,
      guid: this.guid,
      refreshToken: this.refreshToken,
    }
  }

  update(fields: UserUpdate) {
    Object.assign(this, fields)
  }

  delete() {
    this.active = false
  }
}
