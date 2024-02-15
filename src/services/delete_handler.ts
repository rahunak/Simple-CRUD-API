import { type IncomingMessage, type ServerResponse } from 'http'
import { sendResponse } from '../services/send_response'
import storage from '../storage/storage'

function isCorrectUserID (id: any): boolean {
  if (typeof +id === 'number' && !isNaN(+id)) {
    return true
  }
  return false
}

function deleteHandler (request: IncomingMessage, response: ServerResponse): void {
  const { url, method } = request
  if (
    url === undefined || method === undefined ||
    url === null || method === null) {
    sendResponse(400, 'deleteHandler - Bad request \n method:' + method + '\n url:' + url, response)
    return
  }
  const urlParams = url.slice(1).split('/')
  if (urlParams.length === 3 && (url).startsWith('/api/users')) {
    const [, , ...Id] = urlParams
    if (!isCorrectUserID(Id[0])) {
      sendResponse(400, 'Bad request - user id is invalid', response)
      return
    }
    const user = storage.find((user) => user.id === +Id[0])
    if (user) {
      storage.splice(storage.indexOf(user), 1)
      sendResponse(200, 'User deleted', response)
    }
    else {
      sendResponse(404, 'deleteHandler: user id doesn\'t exist or Not Found', response)
    }
  }
  else {
    response.writeHead(404, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify({ message: 'deleteHandler: Operation failed' }))
  }
}
export default deleteHandler
