(function () {
  'use strict';

  angular
    .module('workshops')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Workshops',
      state: 'workshops',
      type: 'dropdown',
      class: 'zmdi zmdi-wrench',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'workshops', {
      title: 'List Workshops',
      state: 'workshops.list'
    });

    menuService.addSubMenuItem('topbar', 'workshops', {
      title: 'My Workshop',
      state: 'workshops.user',
      roles: ['user']
    });
  }
}());
