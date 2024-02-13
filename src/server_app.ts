import http, { type ServerResponse, type IncomingMessage } from 'http'
import * as dotenv from 'dotenv'
import serverHandler from './services/server_handler'

dotenv.config()
export let port = parseInt(process.env.PORT ?? '4000', 10)

export const startServerApp = (port: number) => {
  return http.createServer((request: IncomingMessage, response: ServerResponse) => {
    serverHandler(request, response)
  }).listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
  })
}

startServerApp(port = 4000)
