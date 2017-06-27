'use strict';

const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

const app = express();
let server;

app.use(require('../route/blog-router.js'));
app.use(require('./error-middleware.js'));

const serverControl = module.exports = {};
serverControl.start = () => {
  return new Promise((resolve, reject) => {
    if(!server || !server.isOn) {
      server = app.listen(process.env.PORT, () => {
        console.log('servin up some booya, yall', process.env.PORT);
        server.isOn = true;
        resolve();
      });
      return;
    }
    reject();
  });
};

serverControl.stop = () => {
  return new Promise((resolve, reject) => {
    if(server && server.isOn) {
      server.close(() => {
        console.log('server gone, it gone!');
        server.isOn = false;
        resolve();
      });
      return;
    }
    reject();
  });
};
