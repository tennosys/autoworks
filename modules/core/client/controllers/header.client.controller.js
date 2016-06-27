(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', '$state', 'Authentication', 'menuService', '$mdSidenav'];

  function HeaderController($scope, $state, Authentication, menuService, $mdSidenav) {
    var vm = this;

    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.menu = menuService.getMenu('topbar');
    vm.toggleList = toggleList;
    vm.isOpen = isOpen;
    vm.toggleOpen = toggleOpen;

    $scope.$on('$stateChangeSuccess', stateChangeSuccess);

    function stateChangeSuccess() {
      // Collapsing the menu after navigation
      $mdSidenav('left').close();
    }
    function toggleList() {
      $mdSidenav('left').toggle();
    }
    function isOpen(menuState) {
      return menuService.isSectionSelected(menuState);
    }
    function toggleOpen(menuState) {
      menuService.toggleSelectSection(menuState);
    }
  }
}());
