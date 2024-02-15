import { type IncomingMessage, type ServerResponse } from 'http'
import { sendResponse } from '../services/send_response'
import getHandler from './get_handler'
import { postHandler } from './post_handler'
import { putHandler } from './put_handler'
import deleteHandler from './delete_handler'
import { IDialog } from '../interfaces/interfaces'

function serverHandler (request: IncomingMessage, response: ServerResponse): void {
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  response.setHeader('Access-Control-Allow-Credentials', 'true')
  response.setHeader('Content-Type', 'application/json')
  response.setHeader('X-Content-Type-Options', 'nosniff')

  try {
    const { method, url } = request

    if (method === 'OPTIONS') {
      response.writeHead(200)
      response.end()
      return
    }

    if (url === undefined || method === undefined ||
      url === null || method === null) {
      console.log('serverHandler - Bad request\n url:', url, '\nmethod:', method)
      sendResponse(400, 'Bad request', response)
      return
    }

    switch (method) {
      case 'GET':
        getHandler(request, response)
        break
      case 'POST':
        postHandler(request, response)
        break
      case 'PUT':
        putHandler(request, response)
        break
      case 'DELETE':
      // deleteHandler(request, response)
        break
      default:
        break
    }
  }
  catch (err) {
    console.log('error - serverHandler:', err)
    sendResponse(500, 'Internal server error', response)
  }
}
export default serverHandler
