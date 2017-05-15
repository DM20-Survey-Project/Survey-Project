// angular.module('surveyApp').controller('templateCtrl', function($scope,  $state, $stateParams,surveyService, templateService, entityService){
//
// 	$scope.checkTemplate = function () {
// 		$scope.selectedTemplate = templateService.getSelectedTemplate()
//
// 		$scope.survey.questions = $scope.selectedTemplate.template.questions
// 		$scope.survey.title = $scope.selectedTemplate.template.title
//
// 		//TODO fix this
// 		$scope.survey.entities = {}
// 		for (var i = 0; i < $scope.selectedTemplate.types.length; i++) {
// 			$scope.survey.entities[$scope.selectedTemplate.types[i]]
// 			if ($scope.survey.entities[$scope.selectedTemplate.types[i]]) {
// 				console.log('!!!FOUND ONE!!!');
// 			} else {
// 				$scope.survey.entities[$scope.selectedTemplate.types[i]] = undefined;
// 			}
//
//
// 		}
//
// 		$scope.entities = []
// 		$scope.entities = entityService.getEntities($scope.selectedTemplate.types)
// 		$scope.checkCompleted()
//
// 	}
//
// });
