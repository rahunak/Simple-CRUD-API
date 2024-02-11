

var http = require('http');

 

const init = () => {

    http.createServer(function (request, response) {
      console.log("process.env.PORT",process.env.PORT)
      console.log('Url: ' + request.url);
      console.log('Тип запроса: ' + request.method);
      console.log(
          'User-Agent: ' + request.headers['user-agent']
      );
      console.log('Все заголовки');
      console.log(request.headers);
        response.end('Hello world!11fgh1');
    }).listen(process.env.PORT);
  };
  
  try {
    init();
  }
  catch (err) {
    console.error('Operation failed', err);
  }
  