angular.module('surveyApp')
.directive('dropdownDirective', function() {
  return {
    templateUrl: "views/dropdown.html",
    restrict: 'E',
    scope: {
      entities: '=',
      title: '=',
      check: '&',
      checkTemplate: '&',
      surveyEntities: '='
      
    },
    controller: function( $scope, $state, templateService ) {
      $scope.isCohort = false
      $scope.isTemplate = false;

      if ($scope.title === 'Cohort') {
        $scope.isCohort = true;
      } else if ($scope.title === 'Template') {
        $scope.isTemplate = true;
      }


      $scope.select = function (id) {
        if ($scope.isTemplate) {
          for (var i = 0; i < $scope.entities.length; i++) {
            if ($scope.entities[i].id == id) {
              $scope.selected = $scope.entities[i]
              templateService.giveSelected($scope.selected)
              $scope.checkTemplate()
            }
            
          }
        } else {
          for (var i = 0; i < $scope.entities.entities.length; i++) {
            if ($scope.entities.entities[i].id == id) {
              $scope.selected = $scope.entities.entities[i]
              $scope.surveyEntities[$scope.entities.type] = $scope.selected
              $scope.check()
            }
            
          }
        }
        $scope.show();
      }
      $scope.show = function () {
        if ($scope.shown) {
          $scope.shown = false
        } else {
          $scope.shown = true
        }
      }
    },
    link: function(scope, element, attributes ) {
    }
  }
});
