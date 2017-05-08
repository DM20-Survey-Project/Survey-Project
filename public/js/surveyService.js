angular.module('surveyApp').service('surveyService', function() {


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
        questionTitle: 'How good is micahel memory at mentoring?',
        type: 'text',
        required: true


      },{
        questionTitle: 'uhwoueofhoeir?',
        type: 'boolean',
        required: true


      },{
        questionTitle: 'How good is micahel memoryasdfring?',
        type: 'number',
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
        questionTitle: 'How good is micahel memory at mentoring?',
        type: 'boolean',
        required: true


      },{
        questionTitle: 'How good is micahel memory at mentoring?',
        type: 'text',
        required: true


      },{
        questionTitle: 'How good is micahel memory at mentoring?',
        type: 'number',
        required: true


      },
    ]
  }

  });
