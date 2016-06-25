(function (app) {
  'use strict';

  // Start by defining the main module and adding the module dependencies
  angular
    .module(app.applicationModuleName, app.applicationModuleVendorDependencies);

  // Setting HTML5 Location Mode
  angular
    .module(app.applicationModuleName)
    .config(bootstrapConfig);

  function bootstrapConfig($locationProvider, $httpProvider, $mdThemingProvider, $mdIconProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');

    $httpProvider.interceptors.push('authInterceptor');

    $mdIconProvider
        .icon("menu", "./assets/svg/menu.svg", 24);
    $mdThemingProvider.theme('default')
      .primaryPalette('red', {
        'default': '500',
        'hue-1': '100',
        'hue-2': '600',
        'hue-3': 'A100'
      });
  }

  bootstrapConfig.$inject = ['$locationProvider', '$httpProvider', '$mdThemingProvider', '$mdIconProvider'];

  // Then define the init function for starting up the application
  angular.element(document).ready(init);

  function init() {
    // Fixing facebook bug with redirect
    if (window.location.hash && window.location.hash === '#_=_') {
      if (window.history && history.pushState) {
        window.history.pushState('', document.title, window.location.pathname);
      } else {
        // Prevent scrolling by storing the page's current scroll offset
        var scroll = {
          top: document.body.scrollTop,
          left: document.body.scrollLeft
        };
        window.location.hash = '';
        // Restore the scroll offset, should be flicker free
        document.body.scrollTop = scroll.top;
        document.body.scrollLeft = scroll.left;
      }
    }

    // Then init the app
    angular.bootstrap(document, [app.applicationModuleName]);
  }
}(ApplicationConfiguration));
