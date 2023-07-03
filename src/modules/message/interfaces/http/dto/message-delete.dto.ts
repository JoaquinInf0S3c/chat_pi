import { MessageProperties } from 'src/modules/message/domain/message'
import { DTO } from './dto.generic'

interface MessageDTO {
  content: string
  sender: string
  receiver: string
  guid: string
}

export type MessageDeleteDTO = MessageDTO

export class MessageDeleteMapping extends DTO<MessageProperties, MessageDeleteDTO> {
  execute(data: MessageProperties): MessageDeleteDTO {
    return {
      content: data.content,
      sender: data.sender,
      receiver: data.receiver,
      guid: data.guid,
    }
  }
}
