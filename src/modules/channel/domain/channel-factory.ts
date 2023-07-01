import { v4 as uuidv4 } from 'uuid'
import Channel, { ChannelProperties } from './channel'
import { ChannelNameRequiredException } from './exceptions/channel.exception'
import { Result, err, ok } from 'neverthrow'

export type ChannelResult = Result<Channel, ChannelNameRequiredException>

export default class ChannelFactory {
  async create(name: string): Promise<ChannelResult> {
    if (!name || name.trim() === '') {
      return err(new ChannelNameRequiredException())
    }

    const channelProperties: ChannelProperties = {
      name,
      guid: uuidv4(),
    }
    const channel = new Channel(channelProperties)
    return ok(channel)
  }
}
