'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Workshops Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/workshops',
      permissions: '*'
    }, {
      resources: '/api/workshops/:workshopId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/workshops',
      permissions: ['get', 'post']
    }, {
      resources: '/api/workshops/:workshopId',
      permissions: ['get']
    }, {
      resources: '/api/workshops/user/:username',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/workshops',
      permissions: ['get']
    }, {
      resources: '/api/workshops/:workshopId',
      permissions: ['get']
    }, {
      resources: '/api/workshops/user/:username',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Workshops Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an workshop is being processed and the current user created it then allow any manipulation
  if (req.workshop && req.user && req.workshop.user && req.workshop.user.id === req.user.id) {
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
