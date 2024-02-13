function deleteHandler (request, response) {
  console.log('deleteHandler', request.url)

  response.end('Hello world!')
}
export default deleteHandler
