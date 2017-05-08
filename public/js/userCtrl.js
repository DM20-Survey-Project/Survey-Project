angular.module('surveyApp').controller('userCtrl', function($scope, $state, $stateParams, userService) {


  // $scope.loadUntakenSurveys = function() {
  //         userService.getUntaken(auth._id)
  //         .then(function( response ) {
  //             console.log('in studentCtrl');
  //             console.log('in loadUntakenSurveys')
  //             console.log('response', response);
  //             $scope.untakenSurveys = response.data;
  //         });
  //     }
  //
  //     $scope.loadUntakenSurveys();

$scope.getUser = function(){

  $scope.surveys = userService.getUser();


}
$scope.getUser();
console.log($scope.surveysColumn1)
  // $scope.getUntaken = function(studentId){
  //   $scope.userData = userService.getUntaken('590cf0a10bc4105a51c14dd6');
  //   if($scope.userData.surveysA.length == 0 && $scope.userData.surveysB.length == 0) {
  //       $scope.noSurveys = true;
  //   }
  // }
  // $scope.getUntaken();
  // console.log('test')
})
