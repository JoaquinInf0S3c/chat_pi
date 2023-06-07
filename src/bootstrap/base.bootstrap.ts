import { DataSource } from 'typeorm'

export abstract class Bootstrap {
  abstract intialize(): Promise<string | Error | DataSource>
}
