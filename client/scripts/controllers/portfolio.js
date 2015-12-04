myApp.controller('PortfolioCtrl', ['$scope', '$http','$window', '$filter', 'DataService', '$uibModal', function($scope, $http, $window, $filter, DataService, $uibModal) {
    var orderBy = $filter('orderBy');
    $scope.dataService = DataService;

    $scope.user = {};
    $scope.portfolio = [];


    if($scope.dataService.peopleData() === undefined){
        $scope.dataService.retrieveData().then(function(){
            var auth = $scope.dataService.peopleData();
            if (!auth || auth.role != 'student') {
                $window.location.href = '/user/logout';
            }
            $scope.user = $scope.dataService.peopleData();
        });
    }

    $scope.user = $scope.dataService.peopleData();
    //Page Specific things


    $scope.populateTable = function(){
        $http.get('/assign').then(function(result){
            $scope.portfolio = result.data;
            console.log($scope.portfolio);
            $scope.sortBy('status_code', false);
        })
    };

    $scope.open = function(data) {
        switch (data.status_code) {
            //for new assignments
            case 0:
                var modalInstance = $uibModal.open({
                    animation: true,
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
                    animation: true,
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
                    animation: true,
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

    $scope.sortBy = function(predicate, reverse){
        $scope.portfolio= orderBy($scope.portfolio, predicate, reverse);
    };

    $scope.populateTable();
}]);