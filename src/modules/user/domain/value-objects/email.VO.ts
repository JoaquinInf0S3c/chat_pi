import { UserEmailInvalidException } from '../exceptions/user.exception'
import { ValueObject } from './vo.class'
import { err, ok, Result } from 'neverthrow'

interface EmailProps {
  value: string
}

export type EmailResult = Result<EmailVO, UserEmailInvalidException>

export class EmailVO extends ValueObject<EmailProps> {
  private constructor(props: EmailProps) {
    super(props)
  }

  get value(): string {
    return this.props.value
  }

  static create(email: string): EmailResult {
    if (!this.validateEmail(email)) {
      return err(new UserEmailInvalidException())
    }

    return ok(new EmailVO({ value: email }))
  }

  private static validateEmail(email: string): boolean {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
  }

  // Método creado por el profesor
  //static create(email: string): EmailVO {
  // if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gi)) {
  //   throw new Error('Invalid email')
  // }
  // return new EmailVO({ value: email })
}
