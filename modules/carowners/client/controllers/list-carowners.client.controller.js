(function () {
  'use strict';

  angular
    .module('carowners')
    .controller('CarownersListController', CarownersListController);

  CarownersListController.$inject = ['CarownersService'];

  function CarownersListController(CarownersService) {
    var vm = this;

    vm.carowners = CarownersService.query();
  }
}());
