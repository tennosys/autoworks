(function () {
  'use strict';

  angular
    .module('carowners')
    .controller('CarownersController', CarownersController);

  CarownersController.$inject = ['$scope', '$state', 'carownerResolve', '$window', 'Authentication', 'BrandsService'];

  function CarownersController($scope, $state, carowner, $window, Authentication, BrandsService) {
    var vm = this;

    vm.carowner = carowner;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.genders = [
      { value: 0, name: 'Male' },
      { value: 1, name: 'Female' }
    ];
    vm.brands = [vm.carowner.brand];
    vm.loadBrands = loadBrands;
    vm.dt = new Date(vm.carowner.dateOfBirth);

    // Remove existing Carowner
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.carowner.$remove($state.go('carowners.list'));
      }
    }

    // Save Carowner
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.carownerForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.carowner._id) {
        vm.carowner.$update(successCallback, errorCallback);
      } else {
        vm.carowner.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('carowners.view', {
          carownerId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    function loadBrands() {
      vm.brands = BrandsService.query();
    }
  }
}());
