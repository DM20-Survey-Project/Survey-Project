angular.module('surveyApp')
.controller('localSignupCtrl', function(localService, $scope, $state, $location, $anchorScroll) {


    $scope.processForm = function() {
        localService.signup($scope.user)
        .then(function( response ) {
            console.log('in signupCtrl');
            console.log('in processForm')
            console.log('response', response);
            if (response.status === 200) {
                $state.go('login', {
                    toastMessage: 'Signup Successful'
                });
            }
        })
        .catch(function(err) {
             // For any error, send them back to admin login screen.
             console.error('err = ', err);
             if (err.data.message)
                $scope.errorMsg = err.data.message;
        });

    }

});
