(function () {
  'use strict';

  angular
    .module('workshops.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('workshops', {
        abstract: true,
        url: '/workshops',
        template: '<ui-view/>'
      })
      .state('workshops.list', {
        url: '',
        templateUrl: 'modules/workshops/client/views/list-workshops.client.view.html',
        controller: 'WorkshopsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Workshops List'
        }
      })
      .state('workshops.create', {
        url: '/create',
        templateUrl: 'modules/workshops/client/views/form-workshop.client.view.html',
        controller: 'WorkshopsController',
        controllerAs: 'vm',
        resolve: {
          workshopResolve: newWorkshop
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Workshops Create'
        }
      })
      .state('workshops.user', {
        url: '/user',
        templateUrl: 'modules/workshops/client/views/user-workshop.client.view.html',
        controller: 'WorkshopsController',
        controllerAs: 'vm',
        resolve: {
          workshopResolve: getMyWorkshop
        },
        data: {
          pageTitle: 'Workshop {{ workshopResolve.companyName }}'
        }
      })
      .state('workshops.edit', {
        url: '/:workshopId/edit',
        templateUrl: 'modules/workshops/client/views/form-workshop.client.view.html',
        controller: 'WorkshopsController',
        controllerAs: 'vm',
        resolve: {
          workshopResolve: getWorkshop
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Workshop {{ workshopResolve.companyName }}'
        }
      })
      .state('workshops.view', {
        url: '/:workshopId',
        templateUrl: 'modules/workshops/client/views/view-workshop.client.view.html',
        controller: 'WorkshopsController',
        controllerAs: 'vm',
        resolve: {
          workshopResolve: getWorkshop
        },
        data: {
          pageTitle: 'Workshop {{ workshopResolve.title }}'
        }
      });
  }

  getWorkshop.$inject = ['$stateParams', 'WorkshopsService'];

  function getWorkshop($stateParams, WorkshopsService) {
    return WorkshopsService.get({
      workshopId: $stateParams.workshopId
    }).$promise;
  }

  getMyWorkshop.$inject = ['WorkshopsService'];

  function getMyWorkshop(WorkshopsService) {
    return WorkshopsService.user({
      subroute: 'user'
    }).$promise;
  }

  newWorkshop.$inject = ['WorkshopsService'];

  function newWorkshop(WorkshopsService) {
    return new WorkshopsService();
  }
}());
