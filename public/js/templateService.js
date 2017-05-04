angular.module('surveyApp').service('templateService', function() {
  this.getRecentTemplates = function () {
      return recentTemplates
  }
  this.getTemplates = function () {
      return recentTemplates
  }
  this.parseTitle = function (title) {
    console.log(title);
  }
  var recentTemplates = [
      {
          title: '$$cohort$$ - Unit 1 Survey',
          id: 1
      },
      {
          title: '$$cohort$$ - Unit 5 Survey',
          id: 2
      },
      {
          title: '$$cohort$$ - Jquery Survey',
          id: 3
      },
      {
          title: '$$cohort$$ - Weekly',
          id: 4
      },
      {
          title: '$$name$$ - $$cohort$$ - iOS Mentor',
          id: 5
      },
      {
          title: '$$name$$ - $$cohort$$ - iOS Instructor',
          id: 6
      },
      {
          title: '$$name$$ - $$cohort$$ - UI/UX Mentor asdfas dfasdglkfasld asdljfh askljasdflkj',
          id: 7
      },
  ]
})
