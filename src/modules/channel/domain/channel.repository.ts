import Channel, { ChannelUpdate } from './channel'
import { ChannelNotFoundException } from './exceptions/channel.exception'
import { Result } from 'neverthrow'

export interface ChannelRepository {
  list(): Promise<Channel[]>
  listOne(guid: string): Promise<Result<Channel, ChannelNotFoundException>>
  insert(channel: Channel): Promise<Channel>
  update(guid: string, channel: Partial<ChannelUpdate>): Promise<Result<Channel, ChannelNotFoundException>>
  delete(guid: string): Promise<Result<Channel, ChannelNotFoundException>>
}
