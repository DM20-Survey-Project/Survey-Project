angular.module("surveyApp").service("userService", function($http) {

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


    this.getUntaken = function(studentId) {
        return $http({
            method: 'GET',
            url: '/api/surveys/untaken/' + studentId
        });
      }
    });
      // .then(function(response) {
      //     console.log(response)
      //           
      //   })
      // }


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
