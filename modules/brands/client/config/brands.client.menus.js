(function () {
  'use strict';

  angular
    .module('brands')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Brands',
      state: 'brands',
      type: 'dropdown',
      class: 'zmdi zmdi-font',
      roles: ['admin']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'brands', {
      title: 'List Brands',
      state: 'brands.list',
      roles: ['admin']
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'brands', {
      title: 'Create Brand',
      state: 'brands.create',
      roles: ['admin']
    });
  }
}());
