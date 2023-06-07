import { Router } from 'express'
import UserApplication from '../../application/user.application'
import userController from './user.controller'
import { UserRepository } from '../../domain/user.repository'
import UserInfraestructure from '../../infrastructure/UserInfrastructure'

const infrastructure: UserRepository = new UserInfraestructure()
const application = new UserApplication(infrastructure)
const controller = new userController(application)

class UserRouter {
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

export default new UserRouter().expressRouter
