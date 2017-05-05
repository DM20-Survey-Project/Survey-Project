angular.module('surveyApp')
.controller('localLoginCtrl', function(localService, $scope, $state, $stateParams, $location, $anchorScroll ) {

    console.log('$stateParams = ', $stateParams);

    // $(document).ready(function() {
    //     if ($stateParams.toastMessage)
    //          Materialize.toast($stateParams.toastMessage, 4000);
    // });

    $scope.gotoTop = function() {
        // set the location.hash to the id of
        // the element you wish to scroll to.
        $location.hash('top');  // top of body

        // call $anchorScroll()
        $anchorScroll();
    };

    $scope.processForm = function() {
        localService.login($scope.user)
        .then(function( response ) {
            console.log('in loginCtrl');
            console.log('in processForm')
            console.log('response', response);
            if (response.status === 200) {
                if ($stateParams.successRedirect) {
                    $state.go($stateParams.successRedirect);
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

    $scope.gotoTop();

});
