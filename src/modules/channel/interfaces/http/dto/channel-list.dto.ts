import { ChannelProperties } from 'src/modules/channel/domain/channel'
import { DTO } from './dto.generic'

interface ChannelDTO {
  name: string
  guid: string
}

export type ChannelListDTO = ChannelDTO[]

export class ChannelListMapping extends DTO<ChannelProperties[], ChannelListDTO> {
  execute(data: ChannelProperties[]): ChannelListDTO {
    return data.map((channel: ChannelProperties) => {
      return {
        name: channel.name,
        guid: channel.guid,
      }
    })
  }
}
