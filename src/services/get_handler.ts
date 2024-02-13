import { type IncomingMessage, type ServerResponse } from 'http'
import { sendResponse } from '../services/send_response'

function getHandler (request: IncomingMessage, response: ServerResponse): void {
  const { url, method } = request
  if (
    url === undefined || method === undefined ||
    url === null || method === null) {
    sendResponse(400, 'Bad request', response)
    return
  }
  const urlParams = url ?? (url as string).slice(1).split('/')
  if (urlParams.length === 3 && (url).startsWith('/api/users')) {
    const [api, endpoint, ...Id] = urlParams
    console.log('userId', Id)
  }
  console.log('serverHandler', urlParams)

  const params = url.slice(1).split('/')
  console.log('get_handler', url)
  console.log('params', params)
  switch (url) {
    case 'api/users':
      response.statusCode = 200
      break
    case 'api/users/{userId}':

      break
    default:
      break
  }

  response.end('Hello world!')
}
export default getHandler
