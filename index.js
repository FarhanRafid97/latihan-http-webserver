// const http = require('http');
import http from 'http';
import fetch from 'node-fetch';
import url from 'url';
import fs from 'fs';
// const dataJson = require('./data.json');

const response = await fetch('https://jsonplaceholder.typicode.com/posts');
const data = await response.json();
const limaData = [];
for (let i = 0; i < 5; i++) {
  limaData.push(data[i]);
}

const PORT = 3000;

const server = http.createServer((req, res) => {
  const requestUrl = url.parse(req.url).pathname;

  if (requestUrl === '/') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(JSON.stringify(limaData));
  } else if (requestUrl === '/not-home') {
    fs.readFile('./index.html', null, (error, data) => {
      if (error) {
        res.writeHead(404), res.write('Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
      }
      res.end();
    });
  }
});

server.listen(PORT, () => `server berjalan di ${PORT}`);
