import express from 'express';
import dotenv from 'dotenv';
import '@babel/polyfill';
import log from './logger';
import db from './db';
import routes from './routes';
import {
  ALLOW_ORIGIN,
  ALLOW,
  ALLOW_HEADERS,
  ALLOW_METHODS,
  ALLOW_WILDCARD,
  REST_HEADERS_OPTIONS,
  REST_METHODS,
} from './constants';

// Load dotenv
dotenv.config();

const app = express();
const bodyParser = require('body-parser');

const {
  PORT,
} = process.env;

app.use((req, res, next) => {
  res.header(ALLOW_ORIGIN, ALLOW_WILDCARD);
  res.header(ALLOW_HEADERS, REST_HEADERS_OPTIONS);
  res.header(ALLOW_METHODS, REST_METHODS);
  res.header(ALLOW, REST_METHODS);
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);

app.listen(PORT, () => {
  db();
  log(`Node app is running on port ${PORT}`);
});

// export default { app };
module.exports = app;
