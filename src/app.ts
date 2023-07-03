import express, { Application } from 'express'
import routerHealth from './helpers/health'
import HandlerErrors from './helpers/errors'
import channelRoutes from './modules/channel/interfaces/http/channel.routes'
import messageRoutes from './modules/message/interfaces/http/message.routes'
import userRoutes from './modules/user/interfaces/http/user.routes'
import helmet from 'helmet'
import hpp from 'hpp'
import cors from 'cors'
import compression from 'compression'
class App {
  readonly expressApp: Application
  constructor() {
    this.expressApp = express()
    this.mountSecurity()
    this.mountHealthCheck()
    this.mountMiddlewares()
    this.mountRoutes()
    this.mountError()
  }
  mountSecurity() {
    this.expressApp.use(helmet())
    this.expressApp.use(hpp())
    this.expressApp.use(cors(
      {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
      }
    ))
  }

  mountHealthCheck() {
    this.expressApp.use('/', routerHealth)
  }
  mountError() {
    this.expressApp.use(HandlerErrors.notFound)
  }
  mountMiddlewares() {
    this.expressApp.use(express.json())
    this.expressApp.use(compression())
  }
  mountRoutes() {
    this.expressApp.use('/user', userRoutes)
    this.expressApp.use('/channel', channelRoutes)
    this.expressApp.use('/message', messageRoutes)
  }
}

export default new App().expressApp
