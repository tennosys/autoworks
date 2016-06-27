(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', '$state', 'Authentication', 'menuService', '$mdSidenav', '$mdToast'];

  function HeaderController($scope, $state, Authentication, menuService, $mdSidenav, $mdToast) {
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

    angular.element(document).ready(function () {
      // sw-precache
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js').then(function(reg) {
          reg.onupdatefound = function() {
            var installingWorker = reg.installing;
            installingWorker.onstatechange = function() {
              switch (installingWorker.state) {
                case 'installed':
                  if (navigator.serviceWorker.controller) {
                    $mdToast.show(
                      $mdToast.simple()
                        .textContent('New or updated content is available.')
                        .hideDelay(3000)
                    );
                    console.log('New or updated content is available.');
                  } else {
                    $mdToast.show(
                      $mdToast.simple()
                        .textContent('Content is now available offline!')
                        .hideDelay(3000)
                    );
                    console.log('Content is now available offline!');
                  }
                  break;
                case 'redundant':
                  console.error('The installing service worker became redundant.');
                  break;
              }
            };
          };
        }).catch(function(e) {
          console.error('Error during service worker registration:', e);
        });
      }
    });
  }
}());
