angular.module("surveyApp").service("userService", function($http) {



    this.getUntaken = function(studentId) {
        return $http({
            method: 'GET',
            url: '/api/surveys/untaken/' + studentId
        });
    }

    this.getSurvey = function(surveyId) {
        return $http({
            method: 'GET',
            url: '/api/surveys/' + surveyId
        });
    }

    this.getTopic = function(topicId) {
    	return $http({
            method: 'GET',
            url: '/api/topics/' + topicId
        });
     }

     this.writeSurveyResults = function(data) {
    	return $http({
            method: 'POST',
            url: '/api/surveys/results',
            data: data
        });
    }


    var surveysColumn1 = [{}];
    var surveysColumn2 = [{}];
      this.getUser = function () {
        var surveys = {
          column1: [],
          column2: []
        }
        for(var i=0;i < untakenSurveys.length; i++){
              if(i%2 === 0){

                surveys.column1.push(recentSurveys[i])


              } else  {
                  surveys.column2.push(recentSurveys[i])
              }

            }

      return surveys
      }


    //
    // this.getUsers = function() {
    //   return $http({
    //     method: 'GET',
    //     url: '/user'
    //   }).then(function(response) {
    //     return response;
    //   });
    // };
    //
    // this.getUser = function(id) {
    //   return $http({
    //     method: 'GET',
    //     url: '/user?_id=' + id
    //   }).then(function(response) {
    //     return response;
    //   });
    // };
});
