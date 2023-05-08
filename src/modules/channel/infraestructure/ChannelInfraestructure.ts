import { ChannelRepository } from '../domain/channel.repository'
import Channel from '../domain/channel'

export class ChannelInfraestructure implements ChannelRepository {
  list(): Promise<Channel[]> {
    throw new Error('Method not implemented.')
  }
  listOne(guid: string): Promise<Channel> {
    throw new Error('Method not implemented.')
  }
  insert(channel: Channel): Promise<Channel> {
    throw new Error('Method not implemented.')
  }
  update(channel: Channel): Promise<Channel> {
    throw new Error('Method not implemented.')
  }
  delete(guid: string): Promise<Channel> {
    throw new Error('Method not implemented.')
  }
}
