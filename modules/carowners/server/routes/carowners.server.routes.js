'use strict';

/**
 * Module dependencies
 */
var carownersPolicy = require('../policies/carowners.server.policy'),
  carowners = require('../controllers/carowners.server.controller');

module.exports = function (app) {
  // Carowners collection routes
  app.route('/api/carowners').all(carownersPolicy.isAllowed)
    .get(carowners.list)
    .post(carowners.create);

  // Single carowner routes
  app.route('/api/carowners/:carownerId').all(carownersPolicy.isAllowed)
    .get(carowners.read)
    .put(carowners.update)
    .delete(carowners.delete);

  // Finish by binding the carowner middleware
  app.param('carownerId', carowners.carownerByID);
};
