var expressListRoutes = require('express-list-routes');
var express = require('express');
var router = express.Router();


module.exports = function (app) {

  app.use("", router);

  let base = '/api';

  // Set Routes
  require('./auth')(base, router);
  require('./user')(base, router);
  require('./project')(base, router);

  expressListRoutes(router)
};
