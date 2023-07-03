import { MessageProperties } from 'src/modules/message/domain/message'
import { DTO } from './dto.generic'

interface MessageDTO {
  content: string
  sender: string
  receiver: string
  guid: string
}

export type MessageListDTO = MessageDTO[]

export class MessageListMapping extends DTO<MessageProperties[], MessageListDTO> {
  execute(data: MessageProperties[]): MessageListDTO {
    return data.map((message: MessageProperties) => {
      return {
        content: message.content,
        sender: message.sender,
        receiver: message.receiver,
        guid: message.guid,
      }
    })
  }
}