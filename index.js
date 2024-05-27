const http = require('http');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});

const PORT = process.env.PORT || 3000;

proxy.on('error', (err, req, res) => {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
  res.end('<<< Failed to Create httpProxy Server >>>');
});

proxy.on('proxyReq', function(proxyReq, req, res, options) {
  console.log("proxyReq", proxyReq);
});

const server = http.createServer((req, res) => {
  console.log("Forward the request to ", req.url);

  const targetUrl = req.url;
  
  proxy.web(req, res, { target: targetUrl });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
