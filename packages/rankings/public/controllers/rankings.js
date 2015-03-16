'use strict';

angular.module('mean.rankings').controller('RankingsController', ['$scope', '$stateParams', '$location', 'Global', 'Rankings',
  function($scope, $stateParams, $location, Global, Rankings) {
    $scope.global = Global;

    $scope.hasAuthorization = function(ranking) {
      if (!ranking || !ranking.user) return false;
      return $scope.global.isAdmin || ranking.user._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var ranking = new Rankings({
          title: this.title,
          items: this.items
        });
        ranking.$save(function(response) {
          $location.path('rankings/' + response._id);
        });

        this.title = '';
        this.items = [];
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(ranking) {
      if (ranking) {
        ranking.$remove(function(response) {
          for (var i in $scope.rankings) {
            if ($scope.rankings[i] === ranking) {
              $scope.rankings.splice(i,1);
            }
          }
          $location.path('rankings');
        });
      } else {
        $scope.ranking.$remove(function(response) {
          $location.path('rankings');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var ranking = $scope.ranking;
        if(!ranking.updated) {
          ranking.updated = [];
        }
        ranking.updated.push(new Date().getTime());

        ranking.$update(function() {
          $location.path('rankings/' + ranking._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Rankings.query(function(rankings) {
        $scope.rankings = rankings;
      });
    };

    $scope.findOne = function() {
      Rankings.get({
        rankingId: $stateParams.rankingId
      }, function(ranking) {
        $scope.ranking = ranking;
      });
    };
  }
]);
