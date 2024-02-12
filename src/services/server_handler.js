import getHandler from './get_handler.js';
import postHandler from './post_handler.js';
import putHandler from './put_handler.js';
import deleteHandler from './delete_handler.js';

function serverHandler(request, response) {
  const { method, url } = request;
  console.log('request url', request.url);
  console.log('request method', request.method);
  switch (method) {
    case 'GET':
      getHandler(request, response);
      break;
    case 'POST':
      postHandler(request, response);
      break;
    case 'PUT':
      putHandler(request, response);
      break;
    case 'DELETE':
      deleteHandler(request, response);
      break;
    default:
      break;
  }
//   response.end('Hello world11111!');
}
export default serverHandler;
