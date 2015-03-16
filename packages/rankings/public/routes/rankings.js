'use strict';

//Setting up route
angular.module('mean.rankings').config(['$stateProvider',
  function($stateProvider) {
    // Check if the user is connected
    var checkLoggedin = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $timeout(deferred.reject);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };

    // states for my app
    $stateProvider
      .state('all rankings', {
        url: '/rankings',
        templateUrl: 'rankings/views/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('create ranking', {
        url: '/rankings/create',
        templateUrl: 'rankings/views/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit ranking', {
        url: '/rankings/:rankingId/edit',
        templateUrl: 'rankings/views/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('ranking by id', {
        url: '/rankings/:rankingId',
        templateUrl: 'rankings/views/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      });
  }
]);
