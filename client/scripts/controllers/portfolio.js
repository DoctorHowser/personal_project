myApp.controller('PortfolioCtrl', ['$scope', '$http', 'DataService', function($scope, $http, DataService) {
    $scope.dataService = DataService;

    $scope.user = {};

    if($scope.dataService.peopleData() === undefined){
        $scope.dataService.retrieveData().then(function(){
            $scope.user = $scope.dataService.peopleData();
        });
    }

    $scope.user = $scope.dataService.peopleData();
    //Page Specific things
    $scope.queue = [];

    $scope.populateTable = function(){
        $http.get('/assign', {params:{id: $scope.user}}).then(function(result){
            console.log(result);
            //$scope.queue = result.data;
            //$scope.sortBy('-update_time', false);
        })
    };

    $scope.populateTable();
}]);