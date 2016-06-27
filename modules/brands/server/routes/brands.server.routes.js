'use strict';

/**
 * Module dependencies
 */
var brandsPolicy = require('../policies/brands.server.policy'),
  brands = require('../controllers/brands.server.controller');

module.exports = function (app) {
  // Brands collection routes
  app.route('/api/brands').all(brandsPolicy.isAllowed)
    .get(brands.list)
    .post(brands.create);

  // Single brand routes
  app.route('/api/brands/:brandId').all(brandsPolicy.isAllowed)
    .get(brands.read)
    .put(brands.update)
    .delete(brands.delete);

  // Finish by binding the brand middleware
  app.param('brandId', brands.brandByID);
};
