function getHandler (request, response) {
  const { url } = request
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
