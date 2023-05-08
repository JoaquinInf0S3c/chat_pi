import http from 'http'
import { Application } from 'express'
import { Bootstrap } from './base.bootstrap'

export default class extends Bootstrap {
  constructor(private readonly app: Application) {
    super()
  }

  intialize() {
    return new Promise<string | Error>((resolve, reject) => {
      const server = http.createServer(this.app)
      server.listen(3000).on('listening', () => {
        resolve('Server is running on port 3000 from resolve')
        console.log('Server is running on port 3000')
      })
      server.on('error', (error) => {
        reject(error)
      })
    })
  }
}
