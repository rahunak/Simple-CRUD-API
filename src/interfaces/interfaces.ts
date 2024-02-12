import { type ServerResponse, type IncomingMessage } from 'http'
interface IUser {
  id: string
  name: string
  age: number
  hobbies: string[]
}
interface IDialog {
  request: IncomingMessage
  response: ServerResponse
}

export type { IUser, IDialog }
