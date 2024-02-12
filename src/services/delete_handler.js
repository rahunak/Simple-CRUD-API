function deleteHandler(request, response) {
  console.log("request received", request.method);
 

  response.end('Hello world!');
}
export default deleteHandler;
