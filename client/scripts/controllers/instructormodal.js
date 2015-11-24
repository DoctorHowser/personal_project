myApp.controller('InstructorModalCtrl', ['$scope', '$http','$uibModalInstance','items','DataService', function($scope, $http, $uibModalInstance,items, DataService) {
    console.log('on instructor modal controller!');
    $scope.assignment = items;
    console.log($scope.assignment);


    $scope.ok = function () {
        $http.put('/queue', $scope.assignment).then(function(response){
            console.log(response);
            $uibModalInstance.close('Updated!');
        })

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);
