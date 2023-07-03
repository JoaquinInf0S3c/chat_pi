import { Request, Response, NextFunction } from 'express'
import MessageApplication from '../../application/message.application'
import MessageFactory from '../../domain/message-factory'
import { IError } from '../helpers/ierror'
import { GuidVO } from '../../domain/value-objects/guid.VO'
import { MessageInsertMapping } from './dto/message-insert.dto'
import { MessageListOneMapping } from './dto/message-list-one.dto'
import { MessageUpdateMapping } from './dto/message-update.dto'
import { MessageDeleteMapping } from './dto/message-delete.dto'
import { MessageListMapping } from './dto/message-list.dto'

export default class {
  constructor(private application: MessageApplication) {
    this.insert = this.insert.bind(this)
    this.list = this.list.bind(this)
    this.listOne = this.listOne.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async insert(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { content, sender, receiver } = req.body
    const messageResult = await new MessageFactory().create(content, sender, receiver)

    if (messageResult.isErr()) {
      const err: IError = new Error(messageResult.error.message)
      err.statusCode = 418
      return next(err)
    } else {
      const data = await this.application.insert(messageResult.value)
      const result = new MessageInsertMapping().execute(data.properties())
      res.status(201).json(result)
    }
  }

  async list(_req: Request, res: Response) {
    const list = await this.application.list()
    const result = new MessageListMapping().execute(list.map(message => message.properties()))
    res.json(result)
  }

  async listOne(req: Request, res: Response, next: NextFunction) {
    const { guid } = req.params
    const guidResult = GuidVO.create(guid)
    if (guidResult.isErr()) {
      const err: IError = new Error(guidResult.error.message)
      err.statusCode = 411
      return next(err)
    } else {
      const messageResult = await this.application.listOne(guid)
      if (messageResult.isErr()) {
        return res.status(404).json({ message: messageResult.error.message })
      }
      const result = new MessageListOneMapping().execute(messageResult.value.properties())
      res.json(result)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { guid } = req.params
    const { content } = req.body
    const guidResult = GuidVO.create(guid)
    if (guidResult.isErr()) {
      const err: IError = new Error(guidResult.error.message)
      err.statusCode = 411
      return next(err)
    }
    const messageResult = await this.application.update(guid, { content })
    if (messageResult.isErr()) {
      return res.status(404).json({ message: messageResult.error.message })
    }
    const result = new MessageUpdateMapping().execute(messageResult.value.properties())
    res.json(result)
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { guid } = req.params
    const guidResult = GuidVO.create(guid)
    if (guidResult.isErr()) {
      const err: IError = new Error(guidResult.error.message)
      err.statusCode = 411
      return next(err)
    } else {
      const messageResult = await this.application.delete(guid)
      if (messageResult.isErr()) {
        return res.status(404).json({ message: messageResult.error.message })
      }
      const result = new MessageDeleteMapping().execute(messageResult.value.properties())
      res.json(result)
    }
  }
}
