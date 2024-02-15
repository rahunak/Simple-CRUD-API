import { type ServerResponse, type IncomingMessage } from 'http'
interface IUser {
  id: number
  DataBaseUserID: string
  username: string
  age: number
  hobbies: string[]
}
interface IDialog {
  request: IncomingMessage
  response: ServerResponse
}

export type { IUser, IDialog }
