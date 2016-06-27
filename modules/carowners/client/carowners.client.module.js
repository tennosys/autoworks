(function (app) {
  'use strict';

  app.registerModule('carowners', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('carowners.services');
  app.registerModule('carowners.routes', ['ui.router', 'core.routes', 'carowners.services']);
}(ApplicationConfiguration));
