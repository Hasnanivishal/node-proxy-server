const http = require('http');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});

const PORT = process.env.PORT || 3000;

proxy.on('error', (err, req, res) => {

  console.log('proxy server error', err);
  
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
  res.end('<<< Failed to Create httpProxy Server >>>');
});

proxy.on('proxyReq', function(proxyReq, req, res, options) {
  console.log("Proxy Server is called");
});

const server = http.createServer((req, res) => {
  console.log("Request URL is", req.url);
  
  if(req.url == "/") {
    console.log("Forward the request to Default Github API in case of empty");
    proxy.web(req, res, { target: 'https://api.github.com/search/users?q=hasnanivishal&per_page=10&page=1' });
  }

  const targetUrl = req.url;
  console.log("Forward to targetUrl", targetUrl);
  proxy.web(req, res, { target: targetUrl });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
