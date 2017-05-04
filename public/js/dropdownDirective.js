angular.module('surveyApp')
.directive('dropdownDirective', function() {
  return {
    templateUrl: "views/dropdown.html",
    restrict: 'E',
    scope: {
      entities: '=',
      title: '='
      
    },
    controller: function( $scope, $state ) {
      $scope.isCohort = false
      $scope.isTemplate = false;

      console.log($scope.title);
      if ($scope.title === 'Cohort') {
        $scope.isCohort = true;
      } else if ($scope.title === 'Template') {
        $scope.isTemplate = true;
      }


      $scope.select = function (id) {
        if ($scope.isTemplate) {
          console.log('template');
          for (var i = 0; i < $scope.entities.length; i++) {
            if ($scope.entities[i].id == id) {
              console.log('found one');
              $scope.selected = $scope.entities[i]
            }
            
          }
        } else {
          for (var i = 0; i < $scope.entities.entities.length; i++) {
            if ($scope.entities.entities[i].id == id) {
              $scope.selected = $scope.entities.entities[i]
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
