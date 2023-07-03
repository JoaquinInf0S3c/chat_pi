import { v4 as uuidv4 } from 'uuid'
import Message, { MessageProperties } from './message'
import { err, ok, Result } from 'neverthrow'
import {
  MessageContentRequiredException,
  MessageNotFoundException,
  MessageReceiverRequiredException,
  MessageSenderRequiredException,
} from './exceptions/messasge.exception'

export type MessageResult = Result<
  Message,
  | MessageContentRequiredException
  | MessageSenderRequiredException
  | MessageReceiverRequiredException
  | MessageNotFoundException
>

export default class MessageFactory {
  async create(content: string, sender: string, receiver: string): Promise<MessageResult> {
    if (!content || content.trim() === '') {
      return err(new MessageContentRequiredException())
    }
    if (!sender || sender.trim() === '') {
      return err(new MessageSenderRequiredException())
    }
    if (!receiver || receiver.trim() === '') {
      return err(new MessageReceiverRequiredException())
    }

    const messageProperties: MessageProperties = {
      content,
      sender,
      receiver,
      guid: uuidv4(),
    }
    const message = new Message(messageProperties)
    return ok(message)
  }
}
