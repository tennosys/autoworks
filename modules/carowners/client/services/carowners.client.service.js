(function () {
  'use strict';

  angular
    .module('carowners.services')
    .factory('CarownersService', CarownersService);

  CarownersService.$inject = ['$resource'];

  function CarownersService($resource) {
    return $resource('api/carowners/:carownerId', {
      carownerId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
