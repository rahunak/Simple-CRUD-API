import { type ServerResponse } from 'http'

export function sendResponse (statusCode: number, message: string, response: ServerResponse): void {
  response.statusCode = statusCode
  response.setHeader('Content-Type', 'text/plain')
  response.end(message)
}
