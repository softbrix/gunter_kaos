
(function() {
  angular.module('ngGKNameApp', [])
  .controller('NameListController', ['$scope', '$http', function($scope, $http) {
      $scope.names = [];

      $http.get('./names/list').then(function(response) {
        $scope.names = response.data;
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
