const https = require('https');
const options = {
  key: process.env.SSL_KEY,   // Reads from Render secret
  cert: process.env.SSL_CERT  // Reads from Render secret
};
const server = https.createServer(options, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, secure world!\n');
});
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`HTTPS Server running on port ${port}`);
});
