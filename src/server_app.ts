import http, { type ServerResponse, type IncomingMessage } from 'http'
import * as dotenv from 'dotenv'
import serverHandler from './services/server_handler'

dotenv.config()
let port = parseInt(process.env.PORT ?? '4000', 10)

const startServerApp = (port: number) => {
  return http.createServer(serverHandler).listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
  })
}

startServerApp(port = 4000)

export { startServerApp, port }
