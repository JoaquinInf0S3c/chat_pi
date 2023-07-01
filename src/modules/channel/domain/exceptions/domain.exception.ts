export enum DomainExceptionCode {
  DEFAULT_DOMAIN_EXCEPTION = 'DEFAULT_DOMAIN_EXCEPTION',
  CHANNEL_NAME_REQUIRED = 'CHANNEL_NAME_REQUIRED',
  CHANNEL_DESCRIPTION_REQUIRED = 'CHANNEL_DESCRIPTION_REQUIRED',
  CHANNEL_NOT_FOUND = 'CHANNEL_NOT_FOUND',
  CHANNEL_GUID_INVALID = 'CHANNEL_GUID_INVALID',
}

export abstract class DomainException extends Error {
  constructor(message?: string) {
    super(message)
    this.name = DomainExceptionCode.DEFAULT_DOMAIN_EXCEPTION
  }
}
