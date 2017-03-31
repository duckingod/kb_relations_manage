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

    $scope.triples = [];
    $scope.formData = {};
    $scope.editingTriple = {};

    set_dict($scope.editingTriple, kbtripleStringFields, (f) => "");
    set_dict($scope.editingTriple, kbtripleBooleanFields, (f) => false);
    set_dict($scope.formData, kbtripleStringFields, (f) => "");
    set_dict($scope.formData, kbtripleBooleanFields, (f) => false);

    // read relations
    $http.get('api/kbtriple').then(r => angular.forEach(r.data, item => {
        item.editing = false;
        $scope.triples.push(item);
    }));


    $scope.submit = () =>
        $http.post("api/kbtriple", $scope.formData).then( (res) => {
            set_dict($scope.formData, kbtripleStringFields, (f) => "");
            set_dict($scope.formData, kbtripleBooleanFields, (f) => false);
            res.data.editing = false;
            $scope.triples.push(res.data);
            $scope.debug = res.data;
            $("#relationInput").focus();
        });
    $scope.delete = triple => {
        var idx = $scope.triples.indexOf(triple);
        $scope.triples.splice(idx, 1);
        $scope.debug = $scope.triples;
        $http.delete("api/kbtriple/"+triple.id, {});
    };
    $scope.edit = (triple, editingTriple) => {
        set_dict(editingTriple, kbtripleFields, (field) => triple[field]);
        $scope.triples.forEach( (t) => t.editing=false );
        triple.editing = true;
    }
    $scope.editDone = (triple, edited) => {
        set_dict(triple, kbtripleFields, (field) => edited[field]);
        $scope.debug = edited;
        $http.post("api/kbtriple/"+triple.id, edited);
        triple.editing = false;
    };
    $scope.editExit = () => $scope.triples.forEach( (t) => t.editing=false );
}]);

