import { DomainException, DomainExceptionCode } from './domain.exception'

export class ChannelNameRequiredException extends DomainException {
  constructor() {
    super(ChannelNameRequiredException.getMessage())
    this.name = DomainExceptionCode.CHANNEL_NAME_REQUIRED
  }

  static getMessage() {
    return 'Channel name is required'
  }
}

export class ChannelDescriptionRequiredException extends DomainException {
  constructor() {
    super(ChannelDescriptionRequiredException.getMessage())
    this.name = DomainExceptionCode.CHANNEL_DESCRIPTION_REQUIRED
  }

  static getMessage() {
    return 'Channel description is required'
  }
}

export class ChannelNotFoundException extends DomainException {
  constructor() {
    super(ChannelNotFoundException.getMessage())
    this.name = DomainExceptionCode.CHANNEL_NOT_FOUND
  }

  static getMessage() {
    return 'Channel not found'
  }
}

export class ChannelGuidInvalidException extends DomainException {
  constructor() {
    super(ChannelGuidInvalidException.getMessage())
    this.name = DomainExceptionCode.CHANNEL_GUID_INVALID
  }

  static getMessage() {
    return 'Channel guid invalid'
  }
}
