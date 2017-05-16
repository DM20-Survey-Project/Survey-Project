angular.module('surveyApp').directive('adminModalDirective', function(){
	return {
	    templateUrl: "views/adminModal.html",
	    restrict: 'E',
	    scope: {
            action: '=',
            subject: '=',
            close: '&',
			deleteEntity: '&',
			addEntity: '&'
	    },
	    controller: function( $scope, $state ) {
			$scope.entity = {
				
			}
			$scope.submitDisabled = true
			$scope.check = function () {
				if ($scope.entity.name.length < 4) {
					$scope.submitDisabled = true
				} else {
					$scope.submitDisabled = false
				}
			}
            console.log($scope.deleteSubject);
			$scope.deleteEntity = $scope.deleteEntity()
			$scope.addEntity = $scope.addEntity()
			if ($scope.subject === 'mentor' || $scope.subject === 'instructor') {
				console.log();
				$scope.location = true
			} else 
			$scope.submit = function () {
				console.log($scope.entity);
				$scope.entity.type = $scope.subject
				$scope.addEntity($scope.entity)
				$scope.close();
			}
            $scope.delete = function () {
				$scope.deleteEntity($scope.subject._id)
                $scope.close();
            }
	    },
	    link: function(scope, element, attributes ) {

	    }
	  }
})
