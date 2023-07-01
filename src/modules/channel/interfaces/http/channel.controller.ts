import { Request, Response, NextFunction } from 'express'
import ChannelApplication from '../../application/channel.application'
import ChannelFactory from '../../domain/channel-factory'
import { IError } from '../helpers/ierror'
import { GuidVO } from '../../domain/value-objects/guid.VO'
import { ChannelInsertMapping } from './dto/channel-insert.dto'
import { ChannelListOneMapping } from './dto/channel-list-one.dto'
import { ChannelUpdateMapping } from './dto/channel-update.dto'
import { ChannelDeleteMapping } from './dto/channel-delete.dto'
import { ChannelListMapping } from './dto/channel-list.dto'

export default class ChannelController {
  constructor(private application: ChannelApplication) {
    this.insert = this.insert.bind(this)
    this.list = this.list.bind(this)
    this.listOne = this.listOne.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async insert(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { name } = req.body
    const channelResult = await new ChannelFactory().create(name)
    if (channelResult.isErr()) {
      const err: IError = new Error(channelResult.error.message)
      err.statusCode = 418
      return next(err)
    }
    const data = await this.application.insert(channelResult.value)
    const result = new ChannelInsertMapping().execute(data.properties())
    res.status(201).json(result)

  }

  async list(_req: Request, res: Response) {
    const list = await this.application.list()
    const result = new ChannelListMapping().execute(list.map(channel => channel.properties()))
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
      const channelResult = await this.application.listOne(guid)
      if (channelResult.isErr()) {
        return res.status(404).json({ message: channelResult.error.message })
      }
      const result = new ChannelListOneMapping().execute(channelResult.value.properties())
      return res.json(result)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { guid } = req.params
    const fieldsToUpdate = req.body
    const guidResult = GuidVO.create(guid)
    if (guidResult.isErr()) {
      const err: IError = new Error(guidResult.error.message)
      err.statusCode = 411
      return next(err)
    }
    const dataResult = await this.application.update(guid, fieldsToUpdate)
    if (dataResult.isErr()) {
      const err: IError = new Error(dataResult.error.message)
      err.statusCode = 411
      return next(err)
    } else {
      const result = new ChannelUpdateMapping().execute(dataResult.value.properties())
      res.json(result)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const guid = req.params.guid
    const guidResult = GuidVO.create(guid)
    if (guidResult.isErr()) {
      const err: IError = new Error(guidResult.error.message)
      err.statusCode = 411
      return next(err)
    }
    const dataResult = await this.application.delete(guid)
    if (dataResult.isErr()) {
      const err: IError = new Error(dataResult.error.message)
      err.statusCode = 411
      return next(err)
    } else {
      const result = new ChannelDeleteMapping().execute(dataResult.value.properties())
      res.json(result)
    }
  }
}
