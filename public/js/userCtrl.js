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
        $location.hash('top');  // top of body

        $anchorScroll();
    };


    $scope.loadUntakenSurveys = function() {
        userService.getUntaken(auth._id)
        .then(function( response ) {
            $scope.untakenSurveys = [];
            $scope.optionalSurveys = [];
            $scope.repeatableSurveys = [];
            if(!response.data.hasOwnProperty('message')){
              response.data.forEach(function(e){
                if (e.repeatable && e.usersTaken.indexOf(auth._id)>-1){
                  $scope.repeatableSurveys.push(e);
                }else if (e.optional){
                  $scope.optionalSurveys.push(e);
                }else{
                  $scope.untakenSurveys.push(e);
                }
              })
            }
        });
    }


       $scope.gotoTop();
      $scope.loadUntakenSurveys();





  // $scope.getUntaken = function(studentId){
  //   $scope.userData = userService.getUntaken('590cf0a10bc4105a51c14dd6');
  //   if($scope.userData.surveysA.length == 0 && $scope.userData.surveysB.length == 0) {
  //       $scope.noSurveys = true;
  //   }
  // }
  // $scope.getUntaken();
  // console.log('test')
})
