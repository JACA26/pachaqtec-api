// require('dotenv').config()
require('./config/config');
const Server = require('./models/Server');

const server = new Server();

server.start();