angular.module('surveyApp')
.directive('dropdownDirective', function() {
  return {
    templateUrl: "views/dropdown.html",
    restrict: 'E',
    scope: {
      entities: '=',
      
    },
    controller: function( $scope, $state ) {
      $scope.isCohort = false
      if ($scope.entities.type === 'Cohort') {
        $scope.isCohort = true;
      }
      $scope.select = function (id) {
        for (var i = 0; i < $scope.entities.entities.length; i++) {
          if ($scope.entities.entities[i].id == id) {
            $scope.selected = $scope.entities.entities[i]
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
