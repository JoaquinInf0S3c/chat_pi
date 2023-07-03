import { MessageProperties } from 'src/modules/message/domain/message'
import { DTO } from './dto.generic'

interface MessageDTO {
  content: string
  sender: string
  receiver: string
  guid: string
}

export type MessageUpdateDTO = MessageDTO

export class MessageUpdateMapping extends DTO<MessageProperties, MessageUpdateDTO> {
  execute(data: MessageProperties): MessageUpdateDTO {
    return {
      content: data.content,
      sender: data.sender,
      receiver: data.receiver,
      guid: data.guid,
    }
  }
}
