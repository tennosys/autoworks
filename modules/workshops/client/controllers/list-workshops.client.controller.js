(function () {
  'use strict';

  angular
    .module('workshops')
    .controller('WorkshopsListController', WorkshopsListController);

  WorkshopsListController.$inject = ['WorkshopsService'];

  function WorkshopsListController(WorkshopsService) {
    var vm = this;

    vm.workshops = WorkshopsService.query();
  }
}());
