(function () {
  'use strict';

  angular
    .module('carowners.services')
    .factory('CarownersService', CarownersService);

  CarownersService.$inject = ['$resource'];

  function CarownersService($resource) {
    return $resource('api/carowners/:subroute:carownerId/', {
      carownerId: '@_id',
      subroute: '@_subroute'
    }, {
      update: {
        method: 'PUT'
      },
      user: {
        method: 'GET'
      }
    });
  }
}());
