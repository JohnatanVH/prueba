/* eslint-disable no-unused-vars */

const express = require('express');
const cors= require('cors');
const routerApi = require('./routes');


const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler');

const app = express();
const port = 3000;

app.use(express.json());

const whitelist = [
  'http://localhost:8080',
  'https://myapp.com'
];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null,true);
    }else {
      callback(new Error('Acceso denegado'));
    }
  }
};
// app.use(cors(options)); //Para restringir
app.use(cors());
routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('My port: ' + port);
});
