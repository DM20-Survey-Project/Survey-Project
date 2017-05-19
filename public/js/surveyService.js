angular.module('surveyApp').service('surveyService', function($http) {

    this.sendSurvey = function(data) {
        return $http({
            method: 'POST',
            url: '/api/admin/surveys',
            data: data
        });
    }

    this.getSurveys = function() {
        return $http({
            method: 'GET',
            url: '/api/admin/surveys',
        });
    }

});
