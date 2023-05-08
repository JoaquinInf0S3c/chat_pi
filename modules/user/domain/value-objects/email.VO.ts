import { ValueObject } from './vo.class'

interface EmailProps {
  value: string
}

export class EmailVO extends ValueObject<EmailProps> {
  private constructor(props: EmailProps) {
    super(props)
  }

  get value(): string {
    return this.props.value
  }

  static create(email: string): EmailVO {
    if (!this.validateEmail(email)) {
      throw new Error('Invalid email')
    }

    return new EmailVO({ value: email })
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
