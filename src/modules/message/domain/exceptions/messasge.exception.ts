import { DomainException, DomainExceptionCode } from './domain.exception'

export class MessageContentRequiredException extends DomainException {
  constructor() {
    super(MessageContentRequiredException.getMessage())
    this.name = DomainExceptionCode.MESSAGE_CONTENT_REQUIRED
  }

  static getMessage() {
    return 'Message content is required'
  }
}

export class MessageSenderRequiredException extends DomainException {
  constructor() {
    super(MessageSenderRequiredException.getMessage())
    this.name = DomainExceptionCode.MESSAGE_SENDER_REQUIRED
  }

  static getMessage() {
    return 'Message sender is required'
  }
}

export class MessageReceiverRequiredException extends DomainException {
  constructor() {
    super(MessageReceiverRequiredException.getMessage())
    this.name = DomainExceptionCode.MESSAGE_RECEIVER_REQUIRED
  }

  static getMessage() {
    return 'Message receiver is required'
  }
}

export class MessageNotFoundException extends DomainException {
  constructor() {
    super(MessageNotFoundException.getMessage())
    this.name = DomainExceptionCode.MESSAGE_NOT_FOUND
  }

  static getMessage() {
    return 'Message not found'
  }
}

export class MessageGuidInvalidException extends DomainException {
  constructor() {
    super(MessageGuidInvalidException.getMessage())
    this.name = DomainExceptionCode.MESSAGE_GUID_INVALID
  }

  static getMessage() {
    return 'Message guid is invalid'
  }
}
