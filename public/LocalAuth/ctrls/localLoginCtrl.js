angular.module('surveyApp')
.controller('localLoginCtrl', function(localService, $scope, $state, $stateParams ) {


  $scope.processForm = function() {
      localService.login($scope.user)
      .then(function( response ) {
          console.log('in loginCtrl');
          console.log('in processForm')
          console.log('response', response);
          if (response.status === 200) {
              if (response.data.roles[0] == 'admin') {
                  $state.go('admin');
              }
              else { // default redirect to student
                  $state.go('user');
              }
          }
      })
      .catch(function(err) {
           // For any error, send them back to admin login screen.
           console.error('err = ', err);
           if (err.data)
              $scope.errorMsg = err.data;
      });

  }

});
