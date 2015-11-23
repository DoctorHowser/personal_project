var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/assign', {
            templateUrl: "/views/routes/assign.html",
            controller: "AssignCtrl"
        })
        .when('/account', {
            templateUrl: "/views/routes/account.html",
            controller: "AccountCtrl"
        })
        .when('/queue', {
            templateUrl: "/views/routes/queue.html",
            controller: "QueueCtrl"
        })
        .otherwise('user');
}]);
