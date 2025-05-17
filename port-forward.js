const http = require('http');

// Create a port forwarding server
const server = http.createServer((req, res) => {
  console.log(`Forwarding request: ${req.method} ${req.url}`);
  
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: req.url,
    method: req.method,
    headers: req.headers
  };
  
  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });
  
  req.pipe(proxyReq, { end: true });
  
  proxyReq.on('error', (err) => {
    console.error('Proxy request error:', err);
    res.writeHead(500);
    res.end('Proxy error: ' + err.message);
  });
});

// Listen on port 5000
server.listen(5000, () => {
  console.log('Port forwarding server running on port 5000 -> 3000');
});