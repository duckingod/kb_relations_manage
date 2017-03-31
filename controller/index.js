var app = angular.module("myapp", []);

app.config(['$qProvider', function ($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
}]);

app.controller('test', ['$scope', '$http', ($scope, $http) => {
}]);
app.controller('index', ['$scope', '$http', ($scope, $http) => {
    $scope.triples = [];
    $http.get('api/kbtriple').then(r => angular.forEach(r.data, item => {
        item.editing = false;
        $scope.triples.push(item);
        //$scope.triples.push({first:'aaa', relation:'bbb', second:"cc"});
    }));
    $scope.debug = "im debug msg";

    $scope.formData = {first:"", relation:"", second:"", symmetric:false, temporal:false};

    id2triple = ($scope, id) => {
        for (i=0; i<$scope.triples.length; i++)
            if ($scope.triples[i].id==id)
                return [$scope.triples[i], i];
        return [null, -1];
    };

    $scope.submit = () =>
        $http.post("api/kbtriple", $scope.formData).then( (res) => {
            $scope.formData.headEntity = "";
            $scope.formData.tailEntity = "";
            $scope.formData.relation = "";
            $scope.formData.symmetric = false;
            $scope.formData.temporal = false;
            res.data.editing = false;
            $scope.triples.push(res.data);
            $scope.debug = res.data;
        });
    $scope.delete = triple => {
        var idx = $scope.triples.indexOf(triple);
        $scope.triples.splice(idx, 1);
        $scope.debug = $scope.triples;
        $http.delete("api/kbtriple/"+triple.id, {}).then( (res) => { });
    };
    $scope.edit = triple => {
        triple.editing=true;
    }
}]);

