var app = angular.module("myapp", []);
app.controller('indexController', ['$scope',
  function($scope) {
    $scope.greeting = { text: 'Hello' };
}]);
