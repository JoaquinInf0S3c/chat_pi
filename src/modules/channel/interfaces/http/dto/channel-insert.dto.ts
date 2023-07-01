import { ChannelProperties } from 'src/modules/channel/domain/channel'
import { DTO } from './dto.generic'

interface ChannelDTO {
  name: string
  guid: string
}

export type ChannelInsertOneDTO = ChannelDTO

export class ChannelInsertMapping extends DTO<ChannelProperties, ChannelInsertOneDTO> {
  execute(data: ChannelProperties): ChannelInsertOneDTO {
    return {
      name: data.name,
      guid: data.guid,
    }
  }
}
