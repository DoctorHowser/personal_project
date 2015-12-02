myApp.controller('QueueCtrl', ['$scope', '$http','$filter','$window', '$uibModal', 'DataService', function($scope, $http, $filter, $window, $uibModal, DataService) {
    var orderBy = $filter('orderBy');

   //Persistant User Data
    $scope.dataService = DataService;

    $scope.user = {};

    if($scope.dataService.peopleData() === undefined){
        $scope.dataService.retrieveData().then(function(){
            var auth = $scope.dataService.peopleData();
            console.log(auth);
            if (!auth) {
                $window.location.href = '/';
            }
            $scope.user = $scope.dataService.peopleData();
        });
    }

    $scope.user = $scope.dataService.peopleData();

    //Application Specifics

    //Queue
    $scope.queue = [];

    $scope.populateTable = function(){
        $http.get('/queue').then(function(result){

            $scope.queue = result.data;
            $scope.sortBy('-update_time', false);
        })
    };

    $scope.sortBy = function(predicate, reverse){
        $scope.queue= orderBy($scope.queue, predicate, reverse);
    };

    //Modals
    $scope.open = function(data) {

        var modalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'templates/instructormodal.html',
            controller: 'InstructorModalCtrl',
            size: 'lg',
            resolve: {
                items: function () {
                    return data;
                }
            }
        });

        modalInstance.result.then($scope.populateTable)
    };




    $scope.populateTable();
}]);