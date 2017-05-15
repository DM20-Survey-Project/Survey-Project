angular.module('surveyApp').controller('adminResultsCtrl', function($scope, $state, surveyService, templateService) {
    console.log('test');
    $scope.locations = []
  surveyService.getSurveys().then(function (response) {
    
    $scope.surveys = response.data
    for (var i = 0; i < $scope.surveys.length; i++) {
        console.log($scope.locations.indexOf($scope.surveys[i].entities.cohort.location.city) );
        
            
            if ($scope.locations.indexOf($scope.surveys[i].entities.cohort.location.city)  == -1) {
                $scope.locations.push($scope.surveys[i].entities.cohort.location.city)
            }
        
    }
    console.log($scope.locations);
  })
  $scope.select = function (id) {
      $scope.selectedSurvey
      for (var i = 0; i < $scope.surveys.length; i++) {
            if ($scope.surveys[i]._id == id) {
              $scope.selectedSurvey = $scope.surveys[i]
              $scope.hide()
            }
            
          }
  }

  $scope.locationArr = []
  $scope.locationObj = {}
  $scope.selectLocation = function (index) {
    if ($scope.locationObj[index]) {
        $scope.locationObj[index] = false
    } else {
        $scope.locationObj[index] = true
    }
    if ($scope.locationArr.indexOf($scope.locations[index]) == -1) {
        $scope.locationArr.push($scope.locations[index])
    } else {
        $scope.locationArr.splice($scope.locationArr.indexOf($scope.locations[index]), 1)
    }
  } 
  $scope.locationFilter = function (survey) {
    
    if ($scope.locationArr.length == 0) {
        return survey
    } else {
        for (var i = 0; i < $scope.locationArr.length; i++) {
            
            if (survey.entities.cohort.location.city == $scope.locationArr[i]) {
                return survey
            }
            
        }
    }

  }
  $scope.panelHidden = false
  $scope.hide = function () {
      if ($scope.panelHidden) {
        $scope.panelHidden = false
      } else {
        $scope.panelHidden = true
      }
      console.log($scope.panelHidden);
  }
  $scope.$watch('surveys', function () {
      console.log('running');
      if ($scope.surveys) {
          if ($state.params.id) {
            $scope.select($state.params.id)
        }
      }
  })
})
