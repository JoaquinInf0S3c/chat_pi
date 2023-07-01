import { Router } from 'express'
import ChannelApplication from '../../application/channel.application'
import ChannelController from './channel.controller'
import { ChannelRepository } from '../../domain/channel.repository'
import ChannelInfrastructure from '../../infrastructure/ChannelInfrastructure'

const infrastructure: ChannelRepository = new ChannelInfrastructure()
const application = new ChannelApplication(infrastructure)
const controller = new ChannelController(application)

class ChannelRouter {
  readonly expressRouter: Router

  constructor() {
    this.expressRouter = Router()
    this.mountRoutes()
  }

  mountRoutes() {
    this.expressRouter.post('/insert', controller.insert)
    this.expressRouter.get('/list', controller.list)
    this.expressRouter.get('/listOne/:guid', controller.listOne)
    this.expressRouter.put('/update/:guid', controller.update)
    this.expressRouter.delete('/delete/:guid', controller.delete)
  }
}

export default new ChannelRouter().expressRouter
