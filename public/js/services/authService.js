angular.module("surveyApp").service("authService", function($http) {

  this.login = function(userData) {
      console.log('userData = ', userData);

      return $http({
          method: 'POST',
          url: '/api/login',
          data: userData
      });
  };

   this.logout = function() {
      return $http({
          method: 'GET',
          url: '/api/logout'
      });
  };

  this.checkForAuth = function() {
      return $http({
          method: 'GET',
          url: '/api/current_user'
      });
  };

  this.checkForAdminAuth = function() {
      return $http({
          method: 'GET',
          url: '/api/current_admin_user'
      });
  };

});
