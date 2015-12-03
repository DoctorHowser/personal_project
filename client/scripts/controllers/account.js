/**
 * Created by danesmith on 11/23/15.
 */

myApp.controller('AccountCtrl', ['$scope', '$http', '$window','DataService', function($scope, $http, $window, DataService) {
    $scope.dataService = DataService;
    $scope.user = {};

    if($scope.dataService.peopleData() === undefined){
        $scope.dataService.retrieveData().then(function(){
            var auth = $scope.dataService.peopleData();
            if (!auth || auth.role != ('student' || 'instructor')) {
                $window.location.href = '/user/logout';
            }
            $scope.user = $scope.dataService.peopleData();
        });
    }

    $scope.user = $scope.dataService.peopleData();

    $scope.resetPassword = function(){
        console.log('clicked!');
        var body = {
            username: $scope.user.username,
            email: $scope.user.email,
            password: $scope.user.newPassA
        };
        $http.post('/password/reset', body).then(function(){
            $scope.user.newPassA = "";
            $scope.user.newPassB = "";
            $scope.userForm.$setPristine();
        })
    }

}]);


