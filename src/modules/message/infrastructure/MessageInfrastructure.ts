import { err, ok, Result } from 'neverthrow'

import DatabaseBootstrap from '../../../bootstrap/database.bootstrap'

import { MessageNotFoundException } from '../domain/exceptions/messasge.exception'
import { MessageRepository } from '../domain/message.repository'
import Message, { MessageUpdate } from '../domain/message'
import { MessageEntity } from './message.entity'

export default class MessageInfrastructure implements MessageRepository {
  async list(): Promise<Message[]> {
    const repo = DatabaseBootstrap.dataSource.getRepository(MessageEntity)
    const result = await repo.find({ where: { active: true } })
    return result.map((el: MessageEntity) => {
      return new Message({
        guid: el.guid,
        content: el.content,
        sender: el.sender,
        receiver: el.receiver,
        active: el.active,
      })
    })
  }

  async listOne(guid: string): Promise<Result<Message, MessageNotFoundException>> {
    const repo = DatabaseBootstrap.dataSource.getRepository(MessageEntity)
    const result = await repo.findOne({ where: { guid } })

    if (!result) {
      return err(new MessageNotFoundException())
    } else {
      return ok(
        new Message({
          guid: result.guid,
          content: result.content,
          sender: result.sender,
          receiver: result.receiver,
          active: result.active,
        }),
      )
    }
  }

  async insert(message: Message): Promise<Message> {
    const messageInsert = new MessageEntity()
    const { guid, content, sender, receiver, active } = message.properties()

    Object.assign(messageInsert, {
      guid,
      content,
      sender,
      receiver,
      active,
    })

    await DatabaseBootstrap.dataSource.getRepository(MessageEntity).save(messageInsert)
    return message
  }

  async update(guid: string, message: Partial<MessageUpdate>): Promise<Result<Message, MessageNotFoundException>> {
    const repo = DatabaseBootstrap.dataSource.getRepository(MessageEntity)
    const messageFound = await repo.findOne({ where: { guid } })

    if (messageFound) {
      Object.assign(messageFound, message)
      const messageEntity = await repo.save(messageFound)
      return ok(
        new Message({
          guid: messageEntity.guid,
          content: messageEntity.content,
          sender: messageEntity.sender,
          receiver: messageEntity.receiver,
          active: messageEntity.active,
        }),
      )
    } else {
      return err(new MessageNotFoundException())
    }
  }

  async delete(guid: string): Promise<Result<Message, MessageNotFoundException>> {
    const repo = DatabaseBootstrap.dataSource.getRepository(MessageEntity)
    const messageFound = await repo.findOne({ where: { guid } })

    if (messageFound) {
      messageFound.active = false

      const messageEntity = await repo.save(messageFound)

      return ok(
        new Message({
          guid: messageEntity.guid,
          content: messageEntity.content,
          sender: messageEntity.sender,
          receiver: messageEntity.receiver,
          active: messageEntity.active,
        }),
      )
    } else {
      return err(new MessageNotFoundException())
    }
  }
}
