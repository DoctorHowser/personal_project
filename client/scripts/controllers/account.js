/**
 * Created by danesmith on 11/23/15.
 */

myApp.controller('AccountCtrl', ['$scope', '$http', 'DataService', function($scope, $http, DataService) {
    $scope.dataService = DataService;

    $scope.user = {};

    if($scope.dataService.peopleData() === undefined){
        $scope.dataService.retrieveData().then(function(){
            $scope.user = $scope.dataService.peopleData();
        });
    }

    $scope.user = $scope.dataService.peopleData();

    $scope.resetPassword = function(){
        console.log($scope.user.newPassA)
    }

}]);


