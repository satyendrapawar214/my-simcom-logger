const https = require('https');
const fs = require('fs');
const path = require('path');
const options = {
  key: fs.readFileSync(path.join(__dirname, process.env.SSL_KEY_PATH || 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, process.env.SSL_CERT_PATH || 'cert.pem'))
};
const server = https.createServer(options, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, secure world!\n');
});
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`HTTPS Server running on port ${port}`);
});
