'use strict';

/**
 * Module dependencies
 */
var workshopsPolicy = require('../policies/workshops.server.policy'),
  workshops = require('../controllers/workshops.server.controller');

module.exports = function (app) {
  // Workshops collection routes
  app.route('/api/workshops').all(workshopsPolicy.isAllowed)
    .get(workshops.list)
    .post(workshops.create);

  // Single workshop routes
  app.route('/api/workshops/:workshopId').all(workshopsPolicy.isAllowed)
    .get(workshops.read)
    .put(workshops.update)
    .delete(workshops.delete);

  // Single workshop routes
  app.route('/api/workshops/user/:username').all(workshopsPolicy.isAllowed)
    .get(workshops.listByUser);

  // Finish by binding the workshop middleware
  app.param('workshopId', workshops.workshopByID);
};
