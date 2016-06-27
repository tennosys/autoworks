(function () {
  'use strict';

  angular
    .module('workshops')
    .controller('WorkshopsController', WorkshopsController);

  WorkshopsController.$inject = ['$scope', '$state', 'workshopResolve', '$window', 'Authentication'];

  function WorkshopsController($scope, $state, workshop, $window, Authentication) {
    var vm = this;

    vm.workshop = workshop;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Workshop
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.workshop.$remove($state.go('workshops.list'));
      }
    }

    // Save Workshop
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.workshopForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.workshop._id) {
        vm.workshop.$update(successCallback, errorCallback);
      } else {
        vm.workshop.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('workshops.user');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
