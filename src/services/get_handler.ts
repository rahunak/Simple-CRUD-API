import { type IncomingMessage, type ServerResponse } from 'http'
import { sendResponse } from '../services/send_response'
import storage from '../storage/storage'
function getHandler (request: IncomingMessage, response: ServerResponse): void {
  const { url, method } = request
  if (
    url === undefined || method === undefined ||
    url === null || method === null) {
    sendResponse(400, 'Bad request', response)
    return
  }
  const urlParams = url.slice(1).split('/')
  if (urlParams.length === 3 && (url).startsWith('/api/users')) {
    const [, , ...Id] = urlParams
    if (typeof +Id[0] !== 'number' || isNaN(+Id[0])) {
      sendResponse(400, 'Bad request', response)
      return
    }
    const user = storage.find((user) => user.id === +Id[0])
    if (user) {
      sendResponse(200, JSON.stringify(user), response)
    }
    else {
      sendResponse(404, JSON.stringify({ message: 'Not Found' }), response)
    }
  }
  else if (urlParams.length === 2 && url.trim() === '/api/users') {
    sendResponse(200, JSON.stringify(storage), response)
  }
  else {
    response.writeHead(404, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify({ message: 'Not Found' }))
  }
}
export default getHandler
