import { DataSource } from 'typeorm'
import { Bootstrap } from './base.bootstrap'
import config from '../config.json'
import { UserEntity } from '../modules/user/infrastructure/user.entity'
import { ChannelEntity } from '../modules/channel/infrastructure/channel.entity'
import { MessageEntity } from '../modules/message/infrastructure/message.entity'

let appDataSource: DataSource

export default class extends Bootstrap {
  intialize(): Promise<string | Error | DataSource> {
    const AppDataSource = new DataSource({
      type: 'mysql',
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      synchronize: true,
      logging: true,
      entities: [UserEntity, ChannelEntity, MessageEntity],
      migrations: [],
      subscribers: [],
    })
    appDataSource = AppDataSource
    return AppDataSource.initialize()
  }

  static get dataSource(): DataSource {
    return appDataSource
  }
}
