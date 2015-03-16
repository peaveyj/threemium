'use strict';

(function() {
  // Rankings Controller Spec
  describe('MEAN controllers', function() {
    describe('RankingsController', function() {
      // The $resource service augments the response object with methods for updating and deleting the resource.
      // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
      // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
      // When the toEqualData matcher compares two objects, it takes only object properties into
      // account and ignores methods.
      beforeEach(function() {
        jasmine.addMatchers({
          toEqualData: function() {
            return {
              compare: function(actual, expected) {
                return {
                  pass: angular.equals(actual, expected)
                };
              }
            };
          }
        });
      });

      beforeEach(function() {
        module('mean');
        module('mean.system');
        module('mean.rankings');
      });

      // Initialize the controller and a mock scope
      var RankingsController,
        scope,
        $httpBackend,
        $stateParams,
        $location;

      // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
      // This allows us to inject a service but then attach it to a variable
      // with the same name as the service.
      beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

        scope = $rootScope.$new();

        RankingsController = $controller('RankingsController', {
          $scope: scope
        });

        $stateParams = _$stateParams_;

        $httpBackend = _$httpBackend_;

        $location = _$location_;

      }));

      it('$scope.find() should create an array with at least one ranking object ' +
        'fetched from XHR', function() {

          // test expected GET request
          $httpBackend.expectGET('rankings').respond([{
            title: 'An Ranking about MEAN',
            content: 'MEAN rocks!'
          }]);

          // run controller
          scope.find();
          $httpBackend.flush();

          // test scope value
          expect(scope.rankings).toEqualData([{
            title: 'An Ranking about MEAN',
            content: 'MEAN rocks!'
          }]);

        });

      it('$scope.findOne() should create an array with one ranking object fetched ' +
        'from XHR using a rankingId URL parameter', function() {
          // fixture URL parament
          $stateParams.rankingId = '525a8422f6d0f87f0e407a33';

          // fixture response object
          var testRankingData = function() {
            return {
              title: 'An Ranking about MEAN',
              content: 'MEAN rocks!'
            };
          };

          // test expected GET request with response object
          $httpBackend.expectGET(/rankings\/([0-9a-fA-F]{24})$/).respond(testRankingData());

          // run controller
          scope.findOne();
          $httpBackend.flush();

          // test scope value
          expect(scope.ranking).toEqualData(testRankingData());

        });

      it('$scope.create() with valid form data should send a POST request ' +
        'with the form input values and then ' +
        'locate to new object URL', function() {

          // fixture expected POST data
          var postRankingData = function() {
            return {
              title: 'An Ranking about MEAN',
              content: 'MEAN rocks!'
            };
          };

          // fixture expected response data
          var responseRankingData = function() {
            return {
              _id: '525cf20451979dea2c000001',
              title: 'An Ranking about MEAN',
              content: 'MEAN rocks!'
            };
          };

          // fixture mock form input values
          scope.title = 'An Ranking about MEAN';
          scope.content = 'MEAN rocks!';

          // test post request is sent
          $httpBackend.expectPOST('rankings', postRankingData()).respond(responseRankingData());

          // Run controller
          scope.create(true);
          $httpBackend.flush();

          // test form input(s) are reset
          expect(scope.title).toEqual('');
          expect(scope.content).toEqual('');

          // test URL location to new object
          expect($location.path()).toBe('/rankings/' + responseRankingData()._id);
        });

      it('$scope.update(true) should update a valid ranking', inject(function(Rankings) {

        // fixture rideshare
        var putRankingData = function() {
          return {
            _id: '525a8422f6d0f87f0e407a33',
            title: 'An Ranking about MEAN',
            to: 'MEAN is great!'
          };
        };

        // mock ranking object from form
        var ranking = new Rankings(putRankingData());

        // mock ranking in scope
        scope.ranking = ranking;

        // test PUT happens correctly
        $httpBackend.expectPUT(/rankings\/([0-9a-fA-F]{24})$/).respond();

        // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
        //$httpBackend.expectPUT(/rankings\/([0-9a-fA-F]{24})$/, putRankingData()).respond();
        /*
                Error: Expected PUT /rankings\/([0-9a-fA-F]{24})$/ with different data
                EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","title":"An Ranking about MEAN","to":"MEAN is great!"}
                GOT:      {"_id":"525a8422f6d0f87f0e407a33","title":"An Ranking about MEAN","to":"MEAN is great!","updated":[1383534772975]}
                */

        // run controller
        scope.update(true);
        $httpBackend.flush();

        // test URL location to new object
        expect($location.path()).toBe('/rankings/' + putRankingData()._id);

      }));

      it('$scope.remove() should send a DELETE request with a valid rankingId ' +
        'and remove the ranking from the scope', inject(function(Rankings) {

          // fixture rideshare
          var ranking = new Rankings({
            _id: '525a8422f6d0f87f0e407a33'
          });

          // mock rideshares in scope
          scope.rankings = [];
          scope.rankings.push(ranking);

          // test expected rideshare DELETE request
          $httpBackend.expectDELETE(/rankings\/([0-9a-fA-F]{24})$/).respond(204);

          // run controller
          scope.remove(ranking);
          $httpBackend.flush();

          // test after successful delete URL location rankings list
          //expect($location.path()).toBe('/rankings');
          expect(scope.rankings.length).toBe(0);

        }));
    });
  });
}());
