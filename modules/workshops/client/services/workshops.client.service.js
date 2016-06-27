(function () {
  'use strict';

  angular
    .module('workshops.services')
    .factory('WorkshopsService', WorkshopsService);

  WorkshopsService.$inject = ['$resource'];

  function WorkshopsService($resource) {
    return $resource('api/workshops/:subroute:workshopId/:username', {
      workshopId: '@_id',
      username: '@_username',
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
