angular.module('surveyApp').service('surveyService', function() {
  this.getRecentSurveys = function () {
      return recentSurveys
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
})
