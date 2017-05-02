angular.module('surveyApp').service('templateService', function() {
  this.getRecentTemplates = function () {
      return recentTemplates
  }
  var recentTemplates = [
      {
          title: '$$cohort$$ - Unit 1 Survey',
      },
      {
          title: '$$cohort$$ - Unit 5 Survey',
      },
      {
          title: '$$cohort$$ - Jquery Survey',
      },
      {
          title: '$$cohort$$ - Weekly',
      },
      {
          title: '$$name$$ - $$cohort$$ - iOS Mentor',
      },
      {
          title: '$$name$$ - $$cohort$$ - iOS Instructor',
      },
      {
          title: '$$name$$ - $$cohort$$ - UI/UX Mentor asdfas dfasdglkfasld asdljfh askljasdflkj',
      },
  ]
})
