angular.module('surveyApp').service('templateService', function() {
  this.getRecentTemplates = function () {
      return recentTemplates
  }
  this.getTemplates = function () {
      return recentTemplates
  }
  var currentTemplate = {

  }
  this.getSelectedTemplate = function () {
      return currentTemplate
  }
  this.giveSelected = function (template) {
    currentTemplate.template = template
    currentTemplate.types = this.parseTitle(template.title)
  }
  this.parseTitle = function (title) {
    var parsing = false
    var parseStrArr = []
    

    var titleArr = title.split('')
    var parsedEntities = []
    for (var i = 0; i < titleArr.length; i++) {
        
        if (parsing) {
            
            if (titleArr[i] !== '$') {
                parseStrArr.push(titleArr[i])
            } else {
                parsing = false
                parsedEntities.push(parseStrArr.join(''))
                parseStrArr = []
                i += 2
            }
        } else {
            if (titleArr[i - 1] == '$') {
                parsing = true
            }
        }
        
    }
    return parsedEntities
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
          title: '$$mentor$$ - $$cohort$$ - iOS Mentor',
          id: 5
      },
      {
          title: '$$mentor$$ - $$cohort$$ - iOS Instructor',
          id: 6
      },
      {
          title: '$$mentor$$ - $$cohort$$ - UI/UX Mentor asdfas dfasdglkfasld asdljfh askljasdflkj',
          id: 7
      },
  ]
})
