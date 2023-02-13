const http = require('http');
const app = require('./app');

const PORT = 3009;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`stella server runnning... on port ${PORT}`);
});
