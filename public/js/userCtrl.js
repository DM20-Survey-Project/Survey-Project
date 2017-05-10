angular.module('surveyApp').controller('userCtrl', function($scope, $state, $stateParams, auth, authService, userService, $location, $anchorScroll) {

    $scope.name = auth.first_name + ' ' + auth.last_name;
    $scope.isMentor = false;
    $(document).ready(function() {
        if ($stateParams.toastMessage)
            Materialize.toast($stateParams.toastMessage, 4000);
        for (var i = 0; i < auth.roles.length; i++) {
            if (auth.roles[i].role === 'mentor') {
                $scope.isMentor = true;
            }
        }
    });

    $scope.gotoTop = function() {
        // set the location.hash to the id of
        // the element you wish to scroll to.
        $location.hash('top'); // top of body

        $anchorScroll();
    };


    $scope.untakenSurveys = [];
    $scope.loadUntakenSurveys = function() {
        userService.getUntaken(auth._id)
            .then(function(response) {
                if (!response.data.hasOwnProperty('message')) {
                    response.data.forEach(function(e) {
                        $scope.untakenSurveys.push(e);
                    })
                }
                // console.log($scope.untakenSurveys)
                $scope.surveys = {
                    column1: [],
                    column2: []
                }
                for (var i = 0; i < $scope.untakenSurveys.length; i++) {
                    // console.log($scope.untakenSurveys)
                    if (i % 2 === 0) {
                        $scope.surveys.column1.push($scope.untakenSurveys[i])
                        continue;
                    } else {
                        $scope.surveys.column2.push($scope.untakenSurveys[i])
                        continue;
                        // console.log($scope.untakenSurveys[i])
                    }

                    return $scope.surveys
                }

                // console.log($scope.surveys);

            })
    }







    $scope.gotoTop();
    $scope.loadUntakenSurveys();


    $scope.logout = function(){
      console.log('working')
      authService.logout()
       .then(function( response ) {
            if (response.status === 200) {
                $state.go('login');
            }
        });
    }


    // $scope.getUser = function(){
    //   $scope.surveys = userService.getUser();
    // }
    // $scope.getUser();
    // console.log($scope.surveysColumn1)
    // $scope.getUntaken = function(studentId){
    //   $scope.userData = userService.getUntaken('590cf0a10bc4105a51c14dd6');
    //   if($scope.userData.surveysA.length == 0 && $scope.userData.surveysB.length == 0) {
    //       $scope.noSurveys = true;
    //   }
    // }
    // $scope.getUntaken();
    // console.log('test')
})
