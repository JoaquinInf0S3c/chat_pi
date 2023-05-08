import Channel from './channel'

export interface ChannelRepository {
  list(): Promise<Channel[]>
  listOne(guid: string): Promise<Channel>
  insert(channel: Channel): Promise<Channel>
  update(channel: Channel): Promise<Channel>
  delete(guid: string): Promise<Channel>
}
