const fs = require('fs');
const http = require('http');
const url = require('url');
const path = require('path');

// const queryParams = url.parse(request.url, true).query;
const filePath = path.join(__dirname, 'index.html');
const readStream = fs.createReadStream(filePath);

http.createServer((request, response) => {
  if (request.method === 'GET') {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    readStream.pipe(response);
  } else if (request.method === 'POST') {

    let data = '';

    request.on('data', chunk => {
      data += chunk;
    });

    request.on('end', () => {
      const parsedData = JSON.parse(data);
      response.writeHead(200, 'OK', {
        'Content-Type': 'application/json',
      });
      console.log(parsedData);
      response.end(data);
    })
  } else {
    response.statusCode = 405;
    response.end('Method Not Allowed');
  }

}).listen(3000, 'localhost');
