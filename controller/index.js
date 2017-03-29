var app = angular.module("myapp", []);
app.controller('test', ['$scope', '$http', ($scope, $http) => {
}]);
app.controller('index', ['$scope', '$http', ($scope, $http) => {
    $scope.triples = [];
    $http.get('api/kbtriple').then(r => angular.forEach(r.data, item => $scope.triples.push(item)));

    $scope.submit = () =>
        $http.post("api/kbtriple", $scope.formData).then( (res) => {
            $scope.formData.first="";
            $scope.formData.second="";
            $scope.formData.relation="";
            $scope.triples.push(res.data);
        });
}]);

