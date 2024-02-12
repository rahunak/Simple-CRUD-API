import http from 'http';
import * as dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT || 4000;

http.createServer(function (request, response) {
  response.end('Hello world!');
}).listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});