import { MessageProperties } from 'src/modules/message/domain/message'
import { DTO } from './dto.generic'

interface MessageDTO {
  content: string
  sender: string
  receiver: string
  guid: string
}

export type MessageInsertOneDTO = MessageDTO

export class MessageInsertMapping extends DTO<MessageProperties, MessageInsertOneDTO> {
  execute(data: MessageProperties): MessageInsertOneDTO {
    return {
      content: data.content,
      sender: data.sender,
      receiver: data.receiver,
      guid: data.guid,
    }
  }
}
