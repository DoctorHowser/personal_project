/**
 * Created by danesmith on 11/23/15.
 */
myApp.factory('DataService', ['$http', function($http){

    var user = undefined;

    //PRIVATE
    var getUserData = function(){
        return $http.get('/user').then(function(response){
            user = response.data;
            console.log("Async Data Response: ", user);
            return response.data;

        });
    };

    //PUBLIC
    var publicApi = {
        retrieveData: function(){
            return getUserData();
        },
        peopleData: function(){
            return user;
        }
    };

    return publicApi;
}]);