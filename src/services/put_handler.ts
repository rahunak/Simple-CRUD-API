import { type IncomingMessage, type ServerResponse } from 'http'
import { sendResponse } from '../services/send_response'
import storage from '../storage/storage'
import { type IUser } from '../interfaces/interfaces'
import { userValidate, requestGetter } from '../services/post_handler'

function isStorageContainsRecord (user: IUser): boolean {
  return storage.some((record) => record.id === user.id)
}

function userUpdate (user: IUser): void {
  storage.forEach((record) => {
    if (record.id === user.id) {
      record.username = user.username
      record.age = user.age
      record.hobbies = user.hobbies
    }
  })
}
function putValidateUser (user: IUser): boolean {
  if (userValidate(user) && typeof (user.id) === 'number' && !isNaN(user.id)) {
    return true
  }
  return false
}
export async function putHandler (request: IncomingMessage, response: ServerResponse): Promise<void> {
  try {
    const { url, method } = request
    if (
      url === undefined || method === undefined ||
    url === null || method === null) {
      sendResponse(400, 'putHandler - Bad request \n method:' + method + '\n url:' + url, response)
      return
    }
    const urlParams = url.slice(1).split('/')
    if (urlParams.length === 3 && (url).startsWith('/api/users')) {
      const user = await requestGetter(request, response)
      if (!userValidate(user)) {
        sendResponse(400, 'Bad request - no username, age or hobbies', response)
      }

      if (!putValidateUser(user)) {
        sendResponse(400, 'Bad request - userId is invalid', response)
      }

      if (isStorageContainsRecord(user)) {
        const userWithId = userUpdate(user)
        sendResponse(200, 'User updated', response)
      }
      else {
        sendResponse(404, 'user id doesn\'t exist', response)
      }
    }
    else {
      response.writeHead(404, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify({ message: 'putHandler: Operation failed' }))
    }
  }
  catch (error) {

  }
}
