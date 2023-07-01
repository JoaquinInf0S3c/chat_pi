import { ChannelProperties } from 'src/modules/channel/domain/channel';
import { DTO } from './dto.generic';

interface ChannelDTO {
  name: string;
  guid: string;
}

export type ChannelDeleteDTO = ChannelDTO;

export class ChannelDeleteMapping extends DTO<ChannelProperties, ChannelDeleteDTO> {
  execute(data: ChannelProperties): ChannelDeleteDTO {
    return {
      name: data.name,
      guid: data.guid,
    };
  }
}
