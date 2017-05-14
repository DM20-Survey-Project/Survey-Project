angular.module('surveyApp').service('templateService', function($http) {
  this.getRecentTemplates = function () {
      return recentTemplates
  }
this.getTemplates = function () {
      return $http({
            method: 'GET',
            url: '/api/admin/templates'
        })
  }
this.updateTemplate = function(id){
  return $http({
    method: 'PUT',
    url: '/api/admin/templates/'+ id
  })
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
          title: '$$cohort$$ - $$topic$$ - Unit 1 Survey',
          id: 1,
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
