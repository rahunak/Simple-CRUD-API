import { type IncomingMessage, type ServerResponse } from 'http'
import { sendResponse } from '../services/send_response'
import storage from '../storage/storage'
import { type IUser } from '../interfaces/interfaces'
import { v4 as uuidv4 } from 'uuid'

export async function requestGetter (request: IncomingMessage, response: ServerResponse): Promise<IUser> {
  return await new Promise((resolve, reject) => {
    let body = ''
    request.on('data', (chunk) => {
      body += chunk
    })
    request.on('end', () => {
      try {
        const user = JSON.parse(body)
        resolve(user)
      }
      catch (error) {
        sendResponse(400, 'Invalid JSON format', response)
        console.log('requestGetter - error:', error)
        reject(error)
      }
    })

    request.on('error', (error) => {
      sendResponse(500, 'Internal server error', response)
      console.log('requestGetter - request.on(error):', error)
    })
  })
}
export function userValidate (user: IUser): boolean {
  if (user.hasOwnProperty('username') && user.hasOwnProperty('age') && user.hasOwnProperty('hobbies')) {
    return true
  }
  return false
}
export function addIdParameter (user: IUser): IUser {
  return { ...user, id: storage.length + 1, db_userID: uuidv4() }
}
export async function postHandler<T extends IUser> (request: IncomingMessage, response: ServerResponse): Promise<void> {
  try {
    const user = await requestGetter(request, response)
    if (!userValidate(user)) {
      sendResponse(400, 'Bad request - no username, age or hobbies', response)
      return
    }
    const userWithId = addIdParameter(user)
    storage.push(userWithId)
    sendResponse(201, 'User was created', response)
  }
  catch (error) {
    console.log('postHandler - error:', error)
    sendResponse(500, 'Internal server error', response)
  }
}
