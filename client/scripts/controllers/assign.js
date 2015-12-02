myApp.controller('AssignCtrl', ['$scope', '$http','$window', 'DataService', function($scope, $http, $window, DataService) {
    $scope.dataService = DataService;

    $scope.user = {};

    $scope.restricted = function(){
        var auth = $scope.dataService.peopleData();
        if (!auth || auth.role != 'instructor') {
            console.log('Restricted!');
            $window.location.href = '/';
        }
    };

    if($scope.dataService.peopleData() === undefined){
        $scope.dataService.retrieveData().then(function(){
            var auth = $scope.dataService.peopleData();
            if (!auth || auth.role != 'instructor') {
                $window.location.href = '/';
            }
            $scope.user = $scope.dataService.peopleData();
        });
    }

    $scope.user = $scope.dataService.peopleData();
    //Page Specific things
    $scope.assignment = {};

    $scope.makeAssignment = function(){

        console.log($scope.assignment);
        $http.post('/assign', $scope.assignment).then(function(response){
            if(response) $scope.assignment = {};
        });
    };
    $scope.restricted();
}]);