(function () {
  'use strict';

  angular
    .module('carowners')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Carowners',
      state: 'carowners',
      type: 'dropdown',
      roles: ['user']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'carowners', {
      title: 'List Carowners',
      state: 'carowners.list',
      roles: ['user']
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'carowners', {
      title: 'Create Carowner',
      state: 'carowners.create',
      roles: ['user']
    });
  }
}());
