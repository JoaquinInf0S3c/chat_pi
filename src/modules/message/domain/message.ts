import { IEntity } from 'src/modules/shared/entity.interface'

interface MessageRequired {
  content: string
  sender: string
  receiver: string
}

interface MessageOptional {
  active: boolean
  guid: string
  createdAt: Date
}

export interface MessageUpdate {
  content: string
}

export type MessageProperties = Required<MessageRequired> & Partial<MessageOptional>

export default class Message implements IEntity<MessageProperties, MessageUpdate> {
  private content: string
  private sender: string
  private receiver: string
  private active: boolean
  private readonly guid: string
  private createdAt: Date

  constructor(messageProperties: MessageProperties) {
    this.active = true
    this.createdAt = new Date()
    Object.assign(this, messageProperties)
  }

  properties(): MessageProperties {
    return {
      content: this.content,
      sender: this.sender,
      receiver: this.receiver,
      guid: this.guid,
      createdAt: this.createdAt,
    }
  }

  update(fields: MessageUpdate) {
    Object.assign(this, fields)
  }

  delete() {
    this.active = false
  }
}
