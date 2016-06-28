'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Carowners Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/carowners',
      permissions: '*'
    }, {
      resources: '/api/carowners/:carownerId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/carowners',
      permissions: ['post', 'get']
    }, {
      resources: '/api/carowners/:carownerId',
      permissions: ['get']
    }, {
      resources: '/api/carowners/workshop',
      permissions: ['get']
    }]
  }, {
    roles: ['carowner'],
    allows: [{
      resources: '/api/carowners/user',
      permissions: ['get']
    }, {
      resources: '/api/carowners/:carownerId',
      permissions: ['get', 'post', 'put']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/carowners',
      permissions: ['get']
    }, {
      resources: '/api/carowners/:workshopId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Carowners Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an carowner is being processed and the current user created it then allow any manipulation
  if ((req.carowner && req.user && req.carowner.user && req.carowner.user.id === req.user.id)
  || (req.carowner && req.user && req.carowner.userWorkshop && req.carowner.userWorkshop.id === req.user.id)) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
