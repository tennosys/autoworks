(function () {
  'use strict';

  angular
    .module('brands.services')
    .factory('BrandsService', BrandsService);

  BrandsService.$inject = ['$resource'];

  function BrandsService($resource) {
    return $resource('api/brands/:brandId', {
      brandId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
