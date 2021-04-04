const http = require('http');
const fs = require('fs');
const url = require('url');


const error404 = fs.readFile('404.html', (err, data) => {
  if (err) throw (err)
  return data;
})


http.createServer((req, res) => {
  const q = url.parse(req.url, true);
  let filename = "" + q.pathname;

  if (q.pathname === "/") {
    filename = `./index.html`;
  } else if (q.pathname === "/about") {
    filename = `./about.html`;
  } else if (q.pathname === "/contact") {
    filename = `./contact-me.html`;
  } 

  fs.readFile(filename, (err, data) => {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end(`<h1 style="font-family: sans-serif;">Error 404</h1><p style="font-family: sans-serif;">The page you are looking for doesn't exist.</p>`);
    };
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080);