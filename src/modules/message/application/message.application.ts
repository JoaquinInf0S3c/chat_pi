import Message, { MessageUpdate } from '../domain/message'
import { MessageRepository } from '../domain/message.repository'

export default class MessageApplication {
  constructor(private readonly messageRepository: MessageRepository) {}

  list() {
    return this.messageRepository.list()
  }

  listOne(guid: string) {
    return this.messageRepository.listOne(guid)
  }

  insert(message: Message) {
    return this.messageRepository.insert(message)
  }

  update(guid: string, message: Partial<MessageUpdate>) {
    return this.messageRepository.update(guid, message)
  }

  delete(guid: string) {
    return this.messageRepository.delete(guid)
  }
}
