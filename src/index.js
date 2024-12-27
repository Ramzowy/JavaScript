


import "@babel/polyfill";
import http from 'http';
const requestHandler = function (req, res) {
  if (req.method === 'POST' && req.url === '/users') {  
      res.statusCode = 400; 
       res.end();  
         return; 
       }
  res.writeHead(200, {'Content-Type': 'text/plain'}); 
  res.end('I love Cheese!');}
const server = http.createServer(requestHandler);
server.listen(8080);

