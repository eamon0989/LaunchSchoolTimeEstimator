const app = require('./server');
const http = require('http');
const logger = require('./utils/logger');
const config = require('./utils/config');

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server is listening on PORT ${config.PORT}`);
})
