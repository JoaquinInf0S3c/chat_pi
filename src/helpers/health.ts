import { Router, Request, Response } from 'express'
class RouterHealth {
  readonly expressRouter: Router
  constructor() {
    this.expressRouter = Router()
  }
  mountRoute() {
    this.expressRouter.get('/', (_req: Request, res: Response) => {
      res.send('Server is running')
    })
  }
}

export default new RouterHealth().expressRouter
