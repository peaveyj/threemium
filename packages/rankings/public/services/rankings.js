'use strict';

//Rankings service used for rankings REST endpoint
angular.module('mean.rankings').factory('Rankings', ['$resource',
  function($resource) {
    return $resource('rankings/:rankingId', {
      rankingId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
