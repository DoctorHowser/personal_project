myApp.controller('PortfolioCtrl', ['$scope', '$http','$window', 'DataService', '$uibModal', function($scope, $http, $window, DataService, $uibModal) {
    $scope.dataService = DataService;

    $scope.user = {};
    $scope.portfolio = [];


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
    //Page Specific things
    $scope.queue = [];

    $scope.populateTable = function(){
        $http.get('/assign').then(function(result){
            $scope.portfolio = result.data;
            console.log($scope.portfolio);
            //$scope.queue = result.data;
            //$scope.sortBy('-update_time', false);
        })
    };

    $scope.open = function(data) {
        switch (data.status_code) {
            //for new assignments
            case 0:
                var modalInstance = $uibModal.open({
                    animation: false,
                    templateUrl: 'templates/studentmodal.html',
                    controller: 'StudentModalCtrl',
                    size: 'lg',
                    resolve: {
                        items: function () {
                            return data;
                        }
                    }
                });
                modalInstance.result.then($scope.populateTable);
                break;
            //for submitted assignments
            case 1:
                var modalInstance = $uibModal.open({
                    animation: false,
                    templateUrl: 'templates/studentmodalsubmitted.html',
                    controller: 'StudentModalCtrl',
                    size: 'lg',
                    resolve: {
                        items: function () {
                            return data;
                        }
                    }
                });
                modalInstance.result.then($scope.populateTable);
                break;
            //for reviewed assignments
            case 2:
                var modalInstance = $uibModal.open({
                    animation: false,
                    templateUrl: 'templates/studentmodalreviewed.html',
                    controller: 'StudentModalCtrl',
                    size: 'lg',
                    resolve: {
                        items: function () {
                            return data;
                        }
                    }
                });
                modalInstance.result.then($scope.populateTable);
                break;
    }


    };

    $scope.populateTable();
}]);