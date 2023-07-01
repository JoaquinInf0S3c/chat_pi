import { err, ok, Result } from 'neverthrow'

import DatabaseBootstrap from '../../../bootstrap/database.bootstrap'

import { ChannelNotFoundException } from '../domain/exceptions/channel.exception'
import { ChannelRepository } from '../domain/channel.repository'
import Channel, { ChannelUpdate } from '../domain/channel'
import { ChannelEntity } from './channel.entity'

export default class ChannelInfrastructure implements ChannelRepository {
  async list(): Promise<Channel[]> {
    const repo = DatabaseBootstrap.dataSource.getRepository(ChannelEntity)
    const result = await repo.find({ where: { active: true } })
    return result.map((el: ChannelEntity) => {
      return new Channel({
        guid: el.guid,
        name: el.name,
        active: el.active,
      })
    })
  }

  async listOne(guid: string): Promise<Result<Channel, ChannelNotFoundException>> {
    const repo = DatabaseBootstrap.dataSource.getRepository(ChannelEntity)
    const result = await repo.findOne({ where: { guid } })

    if (!result) {
      return err(new ChannelNotFoundException())
    } else {
      return ok(
        new Channel({
          guid: result.guid,
          name: result.name,
          active: result.active,
        }),
      )
    }
  }

  async insert(channel: Channel): Promise<Channel> {
    const channelInsert = new ChannelEntity()
    const { guid, name, active } = channel.properties()

    Object.assign(channelInsert, {
      guid,
      name,
      active,
    })

    await DatabaseBootstrap.dataSource.getRepository(ChannelEntity).save(channelInsert)
    return channel
  }

  async update(guid: string, channel: Partial<ChannelUpdate>): Promise<Result<Channel, ChannelNotFoundException>> {
    const repo = DatabaseBootstrap.dataSource.getRepository(ChannelEntity)
    const channelFound = await repo.findOne({ where: { guid } })

    if (channelFound) {
      Object.assign(channelFound, channel)
      const channelEntity = await repo.save(channelFound)

      return ok(
        new Channel({
          guid: channelEntity.guid,
          name: channelEntity.name,
          active: channelEntity.active,
        }),
      )
    }

    return err(new ChannelNotFoundException())
  }

  async delete(guid: string): Promise<Result<Channel, ChannelNotFoundException>> {
    const repo = DatabaseBootstrap.dataSource.getRepository(ChannelEntity)
    const channelFound = await repo.findOne({ where: { guid } })

    if (channelFound) {
      channelFound.active = false

      const channelEntity = await repo.save(channelFound)

      return ok(
        new Channel({
          guid: channelEntity.guid,
          name: channelEntity.name,
          active: channelEntity.active,
        }),
      )
    } else {
      return err(new ChannelNotFoundException())
    }
  }
}
