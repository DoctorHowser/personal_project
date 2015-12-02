/**
 * Created by danesmith on 11/23/15.
 */

myApp.controller('AccountCtrl', ['$scope', '$http', '$window','DataService', function($scope, $http, $window, DataService) {
    $scope.dataService = DataService;
    $scope.user = {};

    if($scope.dataService.peopleData() === undefined){
        $scope.dataService.retrieveData().then(function(){
            var auth = $scope.dataService.peopleData();
            if (!auth) {
                $window.location.href = '/';
            }
            $scope.user = $scope.dataService.peopleData();
        });
    }

    $scope.user = $scope.dataService.peopleData();

    $scope.resetPassword = function(){
        console.log($scope.user.newPassA)
    }

}]);


