formApp.factory('AuthService', ['$http', function($http) {

    var serverCheckUniqueValue = function (id, property, value) {
        var data = {
            id: id,
            property: property,
            value: value
        };
        return $http.post("/password/check", data).then(function (res) {
            return res.data.isUnique;
        });
    };

    var publicAPI = {
        checkUniqueValue: serverCheckUniqueValue
    };

    return publicAPI;

}]);