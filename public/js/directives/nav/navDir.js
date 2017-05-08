angular.module('surveyApp').directive('navDir', function() {
  return {
    restrict: 'EA',
    templateUrl: './js/directives/nav/navTmpl.html',
    controller: 'navCtrl'
  };
});
