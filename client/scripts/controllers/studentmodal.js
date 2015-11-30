//for new assignments
myApp.controller('StudentModalCtrl', ['$scope', '$http','$uibModalInstance','items','DataService', function($scope, $http, $uibModalInstance,items, DataService) {
    console.log('on student modal controller!');
    $scope.assignment = items;
    console.log($scope.assignment);


    $scope.ok = function () {
        $http.post('/queue', $scope.assignment).then(function(response){
            console.log(response);
            $uibModalInstance.close('Updated!');
        })

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

