angular.module("surveyApp").service("userService", function($http) {

    this.getSurvey = function(surveyId) {
        return $http({
            method: 'GET',
            url: '/api/surveys/' + surveyId
        });
    }

    this.writeSurveyResults = function(data) {
        return $http({
            method: 'POST',
            url: '/api/surveys/results',
            data: data
        });
    }

    this.getUntaken = function(studentId) {
        return $http({
            method: 'GET',
            url: '/api/surveys/untaken/' + studentId
        });
    }
});
