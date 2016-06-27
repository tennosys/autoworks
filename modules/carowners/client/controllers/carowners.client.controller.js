(function () {
  'use strict';

  angular
    .module('carowners')
    .controller('CarownersController', CarownersController);

  CarownersController.$inject = ['$scope', '$state', 'carownerResolve', '$window', 'Authentication'];

  function CarownersController($scope, $state, carowner, $window, Authentication) {
    var vm = this;

    vm.carowner = carowner;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

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
  }
}());
