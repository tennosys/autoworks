(function () {
  'use strict';

  angular
    .module('brands')
    .controller('BrandsListController', BrandsListController);

  BrandsListController.$inject = ['BrandsService'];

  function BrandsListController(BrandsService) {
    var vm = this;

    vm.brands = BrandsService.query();
  }
}());
