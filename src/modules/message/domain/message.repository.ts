import Message, { MessageUpdate } from './message'
import { MessageNotFoundException } from './exceptions/messasge.exception'
import { Result } from 'neverthrow'

export interface MessageRepository {
  list(): Promise<Message[]>
  listOne(guid: string): Promise<Result<Message, MessageNotFoundException>>
  insert(message: Message): Promise<Message>
  update(guid: string, message: Partial<MessageUpdate>): Promise<Result<Message, MessageNotFoundException>>
  delete(guid: string): Promise<Result<Message, MessageNotFoundException>>
}
