import ServerBootstrap from './bootstrap/server.bootstrap'
import { Bootstrap } from './bootstrap/base.bootstrap'
import Application from './app'
import DatabaseBootstrap from './bootstrap/database.bootstrap'

const serverBootstrap: Bootstrap = new ServerBootstrap(Application)
const databaseBootstrap: Bootstrap = new DatabaseBootstrap()
;(async () => {
  try {
    await serverBootstrap.intialize()
    await databaseBootstrap.intialize()
    console.log('Server is running')
  } catch (error) {
    console.log(error)
  }
})()
