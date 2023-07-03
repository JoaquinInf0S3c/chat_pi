import { Router } from 'express'
import MessageApplication from '../../application/message.application'
import messageController from './message.controller'
import { MessageRepository } from '../../domain/message.repository'
import MessageInfraestructure from '../../infrastructure/MessageInfrastructure'

const infrastructure: MessageRepository = new MessageInfraestructure()
const application = new MessageApplication(infrastructure)
const controller = new messageController(application)

class MessageRouter {
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

export default new MessageRouter().expressRouter
