
(function() {
  angular.module('ngGKNameApp', [])
  .controller('GradeNamesController', ['$scope', '$http','$timeout', function($scope, $http, $timeout) {
      $scope.names = [];
      $scope.current = {};
      $scope.idx = 0;
      $scope.done = false;
      $scope.postMsg = "";

      $http.get('./names/list').then(function(response) {
        $scope.names = _.shuffle(response.data);

        $scope.next();
        $timeout(function() {
          $('#options').barrating({
            theme: 'bars-square',
            showSelectedRating : false,
            showValues : true,
          });
        }, 0);
      }, function(err) {
        console.log('Error', err);
      });

      var updateBar = function() {
        $timeout(function() {
          $('#options').barrating('set', $scope.current.score);
        }, 0);
      };

      $scope.prev = function() {
        if($scope.idx > 1) {
          $scope.current = $scope.names[--$scope.idx - 1];
          updateBar();
        }
      };

      $scope.postForm = function() {
        $scope.posted = true;

        var postData = _.map($scope.names, function(itm) {
          return {
            id: itm._id,
            score: itm.score
          };
        });

        $http.post('./names/addscores', {items: postData}).then(function() {
          $scope.postMsg = "Sparat";
        }, function(err) {
          $scope.postMsg = "Gick inte att spara.";
          console.log('Error', err);
        });
      };

      $scope.next = function() {
        if($scope.current.score !== "") {
          if($scope.idx >= $scope.names.length) {
            $scope.current = {};
            $scope.done = true;
          } else {
            $scope.current = $scope.names[$scope.idx++];
            $scope.current.score = "1";
            updateBar();
          }
        }
      };
    }])
  .controller('NameListController', ['$scope', '$http', function($scope, $http) {
      $scope.names = [];

      $http.get('./names/list').then(function(response) {
        $scope.names = _.map(response.data, function(itm) {
          itm.score = _.reduce(itm.scores, function(memo, num){ return memo + parseInt(num); }, 0);
          return itm;
        });

      }, function(err) {
        console.log('Error', err);
      });
    }])
  .controller('NewNameController', ['$scope', '$http', function($scope, $http) {
      $scope.list = [];
      $scope.new = {
        name : '',
        sex : 'M'
      };
      $scope.submit = function() {
        if ($scope.new.name) {
          //$scope.list.push(angular.copy(this.new));
          $http.post('./names/add', angular.copy(this.new)).then(function() {
            console.log('success');
          }, function(err) {
            console.log('Error', err);
          });
          $scope.new.name = '';
          $scope.$broadcast('newItemAdded');
        }
      };
    }])
    .directive('focusOn', function() {
       return function(scope, elem, attr) {
          scope.$on(attr.focusOn, function(e) {
              elem[0].focus();
          });
       };
    });
}());
