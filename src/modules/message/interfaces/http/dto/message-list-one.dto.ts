import { MessageProperties } from 'src/modules/message/domain/message'
import { DTO } from './dto.generic'

interface MessageDTO {
  content: string
  sender: string
  receiver: string
  guid: string
}

export type MessageListOneDTO = MessageDTO

export class MessageListOneMapping extends DTO<MessageProperties, MessageListOneDTO> {
  execute(data: MessageProperties): MessageListOneDTO {
    return {
      content: data.content,
      sender: data.sender,
      receiver: data.receiver,
      guid: data.guid,
    }
  }
}
