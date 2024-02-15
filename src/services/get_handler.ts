import { type IncomingMessage, type ServerResponse } from 'http'
import { sendResponse } from '../services/send_response'
import storage from '../storage/storage'
function getHandler (request: IncomingMessage, response: ServerResponse): void {
  const { url, method } = request
  if (
    url === undefined || method === undefined ||
    url === null || method === null) {
    sendResponse(400, 'getHandler - Bad request \n method:' + method + '\n url:' + url, response)
    return
  }
  const urlParams = url.slice(1).split('/')
  if (urlParams.length === 3 && (url).startsWith('/api/users')) {
    const [, , ...Id] = urlParams
    if (typeof +Id[0] !== 'number' || isNaN(+Id[0])) {
      sendResponse(400, 'Bad request - user id is invalid', response)
      return
    }
    const user = storage.find((user) => user.id === +Id[0])
    if (user) {
      sendResponse(200, JSON.stringify(user), response)
    }
    else {
      sendResponse(404, JSON.stringify({ message: 'getHandler: user id doesn\'t exist or Not Found' }), response)
    }
  }
  else if (urlParams.length === 2 && url.trim() === '/api/users') {
    sendResponse(200, JSON.stringify(storage,null,4), response)
  }
  else {
    response.writeHead(404, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify({ message: 'getHandler: Not Found' }))
  }
}
export default getHandler
