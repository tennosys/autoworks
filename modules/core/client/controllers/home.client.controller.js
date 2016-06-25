(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$mdSidenav'];

  function HomeController($mdSidenav) {
    var vm = this;
  }
}());
