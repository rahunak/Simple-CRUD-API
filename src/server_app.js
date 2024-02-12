import http from 'http';
import * as dotenv from 'dotenv';
import serverHandler from './services/server_handler.js';

dotenv.config();
const port = process.env.PORT || 4000;

const server = http.createServer((request, response) => {
  serverHandler(request, response);
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
