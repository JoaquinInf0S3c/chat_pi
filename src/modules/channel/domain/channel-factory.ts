import { v4 as uuidv4 } from 'uuid'
import Channel, { ChannelProperties } from './channel'

export default class ChannelFactory {
  async create(name: string) {
    const channelProperties: ChannelProperties = {
      name,
      guid: uuidv4(),
    }
    const channel = new Channel(channelProperties)
    return channel
  }
}
