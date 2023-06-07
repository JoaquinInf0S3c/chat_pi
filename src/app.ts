import express, { Application } from 'express'
import routerHealth from './helpers/health'
import HandlerErrors from './helpers/errors'
import userRoutes from './modules/user/interfaces/http/user.routes'
class App {
  readonly expressApp: Application
  constructor() {
    this.expressApp = express()
    this.mountHealthCheck()
    this.mountMiddlewares()
    this.mountRoutes()
    this.mountError()
  }
  mountHealthCheck() {
    this.expressApp.use('/', routerHealth)
  }
  mountError() {
    this.expressApp.use(HandlerErrors.notFound)
  }
  mountMiddlewares() {
    this.expressApp.use(express.json())
    // TODO: Add middlewares
  }
  mountRoutes() {
    this.expressApp.use('/user', userRoutes)
  }
}

export default new App().expressApp
