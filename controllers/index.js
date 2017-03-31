var app = angular.module("myapp", []);

app.config(['$qProvider', function ($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
}]);

app.controller('test', ['$scope', '$http', ($scope, $http) => {}]);

set_dict = (dict, fieldArray, content_func) => {
   fieldArray.forEach((field) => dict[field] = content_func(field));
};

id2triple = ($scope, id) => {
    for (i=0; i<$scope.triples.length; i++)
        if ($scope.triples[i].id==id)
            return [$scope.triples[i], i];
    return [null, -1];
};

app.controller('index', ['$scope', '$http', ($scope, $http) => {
    $scope.debug = "im debug msg";
    
    kbtripleStringFields = ['headEntity', 'relation', 'tailEntity'];
    kbtripleBooleanFields = ['symmetric', 'temporal'];
    kbtripleFields = kbtripleStringFields.concat(kbtripleBooleanFields);


    $scope.booleanAttrs = [
        {name:'symmetric', text:'Sym', fullText:'Symmetric'},
        {name:'temporal', text:'Temp', fullText:'Temporal'}
    ];
    $scope.stringAttrs = [
        {name:'headEntity', text:'First'},
        {name:'relation', text:'Relation'},
        {name:'tailEntity', text:'Second'}
    ];

    init_relation_dict = (dict) => {
        set_dict(dict, kbtripleStringFields, (f) => "");
        set_dict(dict, kbtripleBooleanFields, (f) => false);
    };

    $scope.triples = [];
    $scope.formData = {};
    $scope.editingTriple = {id:-1};
    $scope.editingTripleId = -1;

    init_relation_dict($scope.editingTriple);
    init_relation_dict($scope.formData);

    // read relations
    $http.get('api/kbtriple').then(r => angular.forEach(r.data, item => {
        item.editing = false;
        $scope.triples.push(item);
    }));

    $scope.editing = triple => $scope.editingTriple.id==triple.id;

    $scope.submit = () => {
        $http.post("api/kbtriple", $scope.formData);
        $scope.triples.push($scope.formData);
        init_relation_dict($scope.formData);
        $("#relationInput").focus();
    }
    $scope.delete = triple => {
        var idx = $scope.triples.indexOf(triple);
        $scope.triples.splice(idx, 1);
        $http.delete("api/kbtriple/"+triple.id, {});
    };
    $scope.edit = (triple, editingTriple) => {
        set_dict(editingTriple, kbtripleFields.concat(['id']), (field) => triple[field]);
    }
    $scope.editDone = (triple, edited) => {
        set_dict(triple, kbtripleFields, (field) => edited[field]);
        $scope.editingTriple.id = -1;
        $http.post("api/kbtriple/"+triple.id, edited);
    };
    $scope.editExit = () => $scope.editingTriple.id = -1;
}]);

