(function () {
  'use strict';

  angular
    .module('carowners')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Car Owners',
      state: 'carowners',
      type: 'dropdown',
      class: 'zmdi zmdi-car',
      roles: ['admin', 'user']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'carowners', {
      title: 'List Car Owners',
      state: 'carowners.list',
      roles: ['admin', 'user', 'carowner']
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'carowners', {
      title: 'Create Car Owner',
      state: 'carowners.create',
      roles: ['user']
    });

    menuService.addSubMenuItem('topbar', 'carowners', {
      title: 'My Car',
      state: 'carowners.user',
      roles: ['carowner']
    });
  }
}());
