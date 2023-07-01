import { ChannelProperties } from 'src/modules/channel/domain/channel'
import { DTO } from './dto.generic'

interface ChannelDTO {
  name: string
  guid: string
}

export type ChannelListOneDTO = ChannelDTO

export class ChannelListOneMapping extends DTO<ChannelProperties, ChannelListOneDTO> {
  execute(data: ChannelProperties): ChannelListOneDTO {
    return {
      name: data.name,
      guid: data.guid,
    }
  }
}
