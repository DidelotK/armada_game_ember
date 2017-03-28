'use strict';

require('dotenv').config();
const winston = require('winston');
const app = require('./controllers/express-server.js');
const db = require('./db-init.js');

winston.level = process.env.LOG_LEVEL;

const server = app.listen(process.env.PORT, () => {
  const host = server.address().address;
  const port = server.address().port;

  db.init();
  winston.log('info', `Example app listening at http://${host}:${port}`);
});
