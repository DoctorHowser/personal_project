var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngMessages']);


myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/assign', {
            templateUrl: "/views/routes/student/assign.html",
            controller: "PortfolioCtrl"
        })
        .when('/account', {
            templateUrl: "/views/routes/student/account.html",
            controller: "AccountCtrl"
        })
        .otherwise('assign');
}]);