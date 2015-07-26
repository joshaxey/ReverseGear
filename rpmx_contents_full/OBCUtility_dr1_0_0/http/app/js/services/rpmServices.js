/*------------------------------------------------
 NavBar
 -------------------------------------------------*/
angular.module('app').factory('navbarData', function($http, $q) {
  return {
    getNavbar: function() {
      var deferred = $q.defer();

      $http({method: 'GET', url: 'api/navbar'}).
          success(function (data){
            deferred.resolve(data);
          }).
          error(function(data) {
            deferred.reject(status);
          });

      return deferred.promise;
    }
  };
});
