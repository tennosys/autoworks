(function () {
  'use strict';

  angular
    .module('carowners.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('carowners', {
        abstract: true,
        url: '/carowners',
        template: '<ui-view/>'
      })
      .state('carowners.list', {
        url: '',
        templateUrl: 'modules/carowners/client/views/list-carowners.client.view.html',
        controller: 'CarownersListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Carowners List'
        }
      })
      .state('carowners.create', {
        url: '/create',
        templateUrl: 'modules/carowners/client/views/create-carowner.client.view.html',
        controller: 'CarownersController',
        controllerAs: 'vm',
        resolve: {
          carownerResolve: newCarowner
        },
        data: {
          roles: ['user'],
          pageTitle: 'Car Owners Create'
        }
      })
      .state('carowners.user', {
        url: '/user',
        templateUrl: 'modules/carowners/client/views/view-carowner.client.view.html',
        controller: 'CarownersController',
        controllerAs: 'vm',
        resolve: {
          carownerResolve: getMyCarowner
        },
        data: {
          pageTitle: 'Car Owner {{ carownerResolve.title }}'
        }
      })
      .state('carowners.edit', {
        url: '/:carownerId/edit',
        templateUrl: 'modules/carowners/client/views/form-carowner.client.view.html',
        controller: 'CarownersController',
        controllerAs: 'vm',
        resolve: {
          carownerResolve: getCarowner
        },
        data: {
          roles: ['user', 'admin', 'carowner'],
          pageTitle: 'Edit Car Owner {{ carownerResolve.title }}'
        }
      })
      .state('carowners.view', {
        url: '/:carownerId',
        templateUrl: 'modules/carowners/client/views/view-carowner.client.view.html',
        controller: 'CarownersController',
        controllerAs: 'vm',
        resolve: {
          carownerResolve: getCarowner
        },
        data: {
          pageTitle: 'Car Owner {{ carownerResolve.title }}'
        }
      });
  }

  getCarowner.$inject = ['$stateParams', 'CarownersService'];

  function getCarowner($stateParams, CarownersService) {
    return CarownersService.get({
      carownerId: $stateParams.carownerId
    }).$promise;
  }

  newCarowner.$inject = ['CarownersService'];

  function newCarowner(CarownersService) {
    return new CarownersService();
  }

  getMyCarowner.$inject = ['CarownersService'];

  function getMyCarowner(CarownersService) {
    return CarownersService.user({
      subroute: 'user'
    }).$promise;
  }
}());
