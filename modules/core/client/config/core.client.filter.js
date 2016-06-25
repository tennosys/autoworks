(function () {
  'use strict';

  angular
    .module('core')
    .filter(nospace)
    .filter(humanizeDoc);

  function nospace() {
    return function (value) {
      return (!value) ? '' : value.replace(/ /g, '');
    };
  }
  function humanizeDoc() {
    return function (doc) {
      if (!doc) return;
      if (doc.type === 'directive') {
        return doc.name.replace(/([A-Z])/g, function ($1) {
          return '-' + $1.toLowerCase();
        });
      }
      return doc.label || doc.name;
    };
  }
}());
