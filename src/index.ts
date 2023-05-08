import ServerBootstrap from './bootstrap/server.bootstrap'
import { Bootstrap } from './bootstrap/base.bootstrap'
import Application from './app'

const serverBootstrap: Bootstrap = new ServerBootstrap(Application)
;(async () => {
  try {
    const resultServer = await serverBootstrap.intialize()
    console.log(resultServer)
  } catch (error) {
    console.error(error)
  }
})()
