angular.module('surveyApp').service('surveyService', function($http) {

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

























  this.getRecentSurveys = function () {
      return recentSurveys
  }
  this.getSurveyById = function () {
    return survey
  }
  var recentSurveys = [
      {
          title: 'DM20 - Week 1 Survey',
          percentComplete: 50
      },
      {
          title: 'DM20 - Week 2 Survey',
          percentComplete: 80
      },
      {
          title: 'DM20 - Week 3 Survey',
          percentComplete: 11
      },
      {
          title: 'DM20 - Week 4 Survey',
          percentComplete: 100
      },
      {
          title: 'DM20 - Week 5 Survey',
          percentComplete: 40
      },
      {
          title: 'Michael Memory - DM20 - Survey',
          percentComplete: 33
      },
      {
          title: 'DM20 - Jquery Survey',
          percentComplete: 0
      },
  ]
  var survey = {
    title: 'DM20-WHATEVER',
    description: 'LOREMMMMMM',
    questions: [
            {
                questionText: 'How good is micahel memory at mentoring?',
                type: 'text',
                required: true


            },{
                questionText: 'uhwoueofhoeir?',
                type: 'boolean',
                required: true


            },{
                questionText: 'How good is micahel memoryasdfring?',
                type: 'numeric',
                required: true,
                min: {
                value: 1,
                tag: 'Very Poor'
                },
                max: {
                value: 20,
                tag: 'Very Good'
                }


            },{
                questionText: 'How good is micahel memory at mentoring?',
                type: 'boolean',
                required: true


            },{
                questionText: 'How good is micahel memory at mentoring?',
                type: 'text',
                required: true


            },{
                questionText: 'How good is micahel memory at mentoring?',
                type: 'numeric',
                required: true,
                min: {
                value: 1,
                tag: 'Very Bad'
                },
                max: {
                value: 5,
                tag: 'Very Great'
                }


            },
        ]
  }

  });
