import Channel, { ChannelUpdate } from '../domain/channel'
import { ChannelRepository } from '../domain/channel.repository'

export default class ChannelApplication {
  constructor(private readonly channelRepository: ChannelRepository) {}

  list() {
    return this.channelRepository.list()
  }

  listOne(guid: string) {
    return this.channelRepository.listOne(guid)
  }

  insert(channel: Channel) {
    return this.channelRepository.insert(channel)
  }

  update(guid: string, channel: Partial<ChannelUpdate>) {
    return this.channelRepository.update(guid, channel)
  }

  delete(guid: string) {
    return this.channelRepository.delete(guid)
  }
}
