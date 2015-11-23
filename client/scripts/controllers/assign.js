myApp.controller('AssignCtrl', ['$scope', '$http', 'DataService', function($scope, $http, DataService) {
    $scope.dataService = DataService;

    $scope.user = {};

    if($scope.dataService.peopleData() === undefined){
        $scope.dataService.retrieveData().then(function(){
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
    }

}]);