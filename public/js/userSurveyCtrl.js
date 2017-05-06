angular.module('surveyApp').controller('userSurveyCtrl', function($scope, $stateParams, $state, userService) {

  console.log('in takeSurveyCtrl');
  console.log('$stateParams.surveyId = ', $stateParams.surveyId);

  $scope.results = {};

   $scope.response = {};

   $scope.notAnswered = [];

   $scope.borderOnYes = [],
   $scope.borderOnNo = [];

  $scope.readTopic = function() {
          userService.getTopic($scope.survey.topic)
          .then(function( response ) {
              console.log('in takeSurveyCtrl');
              console.log('in getTopic');
              console.log('response', response);
              if (response.status === 200) {
                  $scope.topic = response.data[0].name;
              }
           })
          .catch(function(err) {
          // For any error, send them back to admin login screen.
              console.error('err = ', err);
          });
      }

      $scope.initializeResults = function() {

          $scope.results.answers = [];

          console.log('$scope.survey.questions', $scope.survey.questions);
          $scope.survey.questions.forEach(function(question, index, array) {
              $scope.results.answers[index] = {
                  type: question.type
              };
              $scope.notAnswered[index] = false;
              $scope.borderOnYes[index] = false;
              $scope.borderOnNo[index] = false;
          });
          console.log('$scope.results.answers = ', $scope.results.answers);
          console.log('$scope.notAnswered = ', $scope.notAnswered)

      }



      $scope.readSurvey = function() {
         userService.getSurvey($stateParams.surveyId)
         .then(function( response ) {
              console.log('in takeSurveyCtrl');
              console.log('in readSurvey')
              console.log('response', response);
              $scope.survey = response.data;
              $scope.initializeResults();
              $scope.readTopic();
          })
          .catch(function(err) {
              console.error('err = ', err);
              $state.go('user');
          })
      }

      $scope.checkForRequired = function() {

         var allRequiredFieldsAnswered = true;

         for (var i = 0; i < $scope.survey.questions.length; i++) {
             if ($scope.survey.questions[i].required) {
                  switch ($scope.results.answers[i].type) {
                      case 'numeric':
                          if (!$scope.results.answers[i].numericAnswer) {
                              console.log('numeric not answered');
                              $scope.notAnswered[i] = true;
                              allRequiredFieldsAnswered = false;
                          }
                          else {
                              $scope.notAnswered[i] = false;
                          }
                          break;
                      case 'boolean':
                          if (!$scope.results.answers[i].booleanAnswer) {
                          /* Note--boolean answers are saved in directive as string "true" or "false". They are converted to boolean in convertValues() below */
                              console.log('boolean not answered');
                              $scope.notAnswered[i] = true;
                              allRequiredFieldsAnswered = false;
                          }
                          else {
                              $scope.notAnswered[i] = false;
                          }
                          break;
                      case 'text':
                          if (!$scope.results.answers[i].textAnswer) {
                              console.log('text not answered');
                              $scope.notAnswered[i] = true;
                              allRequiredFieldsAnswered = false;
                          }
                          else {
                              $scope.notAnswered[i] = false;
                          }
                          break;
                  }
              }

         }

         return allRequiredFieldsAnswered;

      }

      $scope.convertValues = function() {

          var newObj = {};

          newObj = JSON.parse(JSON.stringify($scope.results));

          for (var i = 0; i < newObj.answers.length; i++) {

              switch (newObj.answers[i].type) {
                  case 'numeric':
                      if (newObj.answers[i].numericAnswer) {
                        newObj.answers[i].numericAnswer =
                              Number(newObj.answers[i].numericAnswer) // convert to numeric answer
                      }
                      break;
                  case 'boolean':
                      if (newObj.answers[i].booleanAnswer) {
                          newObj.answers[i].booleanAnswer = (newObj.answers[i].booleanAnswer === "true"); // convert to boolean answer
                      }
                      break;
              }
          }

          return newObj;
      }

      $scope.processForm = function() {
          var allRequiredAnswered = $scope.checkForRequired();
          if (allRequiredAnswered) {
              $scope.newResults = $scope.convertValues()
              $scope.newResults.user = auth._id;
              $scope.newResults.survey = $stateParams.surveyId;
              console.log('newResults = ', $scope.newResults);
              userService.writeSurveyResults($scope.newResults)
              .then(function( response ) {
                  console.log('in takeSurveyCtrl');
                  console.log('in processForm');
                  console.log('response', response);
                  if (response.status === 200) {
                      $state.go('student', {
                          toastMessage: 'Survey Successfully Submitted'
                      });
                  }
               })
              .catch(function(err) {
              // For any error, send them back to admin login screen.
                  console.error('err = ', err);
                  $scope.errorMsg = 'Error Submitting Survey';
              });
          }
          else {
              $('#validation_modal').openModal();
          }
      }

      $scope.readSurvey();



// 	$scope.getSurveyById = function(){
//     $scope.userData = surveyService.getSurveyById();
//   }
// $scope.getSurveyById();
//
// $scope.getSliderValue = function(x) {
//
//  console.log(x)
// }
// $scope.submit = function(){
//
//
//
//
// 	for (var i = 0; i < $scope.userData.questions.length; i++) {
// 		if($scope.userData.questions[i].required ){
// 			if($scope.userData.questions[i].answer){
// 				$scope.userData.questions[i].incomplete = false;
//
// 			} else {
//
// 				$scope.userData.questions[i].incomplete = true;
// 			}
// 		}
// 	}
// 	console.log($scope.userData)
// }
// $scope.getSliderValue();
// // console.log($scope.userData)
});
