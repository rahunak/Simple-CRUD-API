function getHandler (request, response) {
  switch (request.url) {
    case 'api/users':

      break
    case 'api/users/{userId}':

      break
    default:
      break
  }

  response.end('Hello world!')
}
export default getHandler
