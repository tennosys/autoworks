(function () {
  'use strict';

  angular
    .module('users')
    .controller('ChangePasswordController', ChangePasswordController);

  ChangePasswordController.$inject = ['$scope', '$http', 'Authentication', 'PasswordValidator', '$mdToast'];

  function ChangePasswordController($scope, $http, Authentication, PasswordValidator, $mdToast) {
    var vm = this;

    vm.user = Authentication.user;
    vm.changeUserPassword = changeUserPassword;
    vm.getPopoverMsg = PasswordValidator.getPopoverMsg;

    // Change user password
    function changeUserPassword(isValid) {
      vm.success = vm.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.passwordForm');

        return false;
      }

      $http.post('/api/users/password', vm.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.$broadcast('show-errors-reset', 'vm.passwordForm');
        vm.success = true;
        vm.passwordDetails = null;
        $mdToast.show(
          $mdToast.simple()
            .textContent('Password Changed Successfully')
            .hideDelay(3000)
        );
      }).error(function (response) {
        vm.error = response.message;
        $mdToast.show(
          $mdToast.simple()
            .textContent(vm.error)
            .hideDelay(3000)
        );
      });
    }
  }
}());
