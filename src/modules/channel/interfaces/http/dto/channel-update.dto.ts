import { ChannelProperties } from 'src/modules/channel/domain/channel'
import { DTO } from './dto.generic'

interface ChannelDTO {
  name: string
  guid: string
}

export type ChannelUpdateDTO = ChannelDTO

export class ChannelUpdateMapping extends DTO<ChannelProperties, ChannelUpdateDTO> {
  execute(data: ChannelProperties): ChannelUpdateDTO {
    return {
      name: data.name,
      guid: data.guid,
    }
  }
}
