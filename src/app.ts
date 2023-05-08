import express, { Application } from 'express'
import routerHealth from './helpers/health'
import HandlerErrors from './helpers/errors'
class App {
  readonly expressApp: Application
  constructor() {
    this.expressApp = express()
    this.mountHealthCheck()
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
}

export default new App().expressApp
