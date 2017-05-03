angular.module('surveyApp').service('userService', function() {
  this.getUser = function () {
      return {
				surveysA: recentSurveys,
        surveysB: recentSurveysB
			}
  }
  var recentSurveys = [
      {
          classTitle: 'DM21',
          title: '-Brett Rheiner',
        description: 'Mentor Survey on your personal mentor. 10 questions on your overall rating of your mentor sajdhjhasdkfhklj kjl jkasdhfklj a skljdf jkla kdjajsdh fklj asdf klasdf kjasdf kasdf kjsdf kaskjf kljasdf lkhasdjf klj asdfgakl rgfiuqohrou asdlkjl ;iasdh '
      },
      {
          title: ' - Week 2 Survey',
					  description: 'lorem'
      },
      {
          title: ' - Week 3 Survey',
					  description: 'lorem'
      },
      {
          title: ' - Week 4 Survey',
					  description: 'lorem'
      },
      {
          title: ' - Week 5 Survey',
					  description: 'lorem'
      },
      {
          title: 'Michael Memory -  - Survey',
					  description: 'lorem'
      },
      {
          title: ' - Jquery Survey',
					  description: 'lorem'

      },
  ]

  var recentSurveysB = [
      {
          classTitle: 'DM21',
          title: '-Brett Rheiner',
        description: 'Mentor Survey on your personal mentor. 10 questions on your overall rating of your mentor'
      },
      {
          title: ' - Week 2 Survey',
					  description: 'lorem'
      },
      {
          title: ' - Week 3 Survey',
					  description: 'lorem'
      },
      {
          title: ' - Week 4 Survey',
					  description: 'lorem'
      },
      {
          title: ' - Week 5 Survey',
					  description: 'lorem lasihdfo hhasdfoih oph asdfjhasldkjhfjkhaskldjhfklj hkljasdhf   kj hadjf haskjdh kjasd fkjhakldjf hklajsd klj hkajsdf khasj kdhfklj asdfklj askljdf hjakljasdkljh fklj asdfhjk'
      },
      {
          title: 'Michael Memory -  - Survey',
					  description: 'lorem'
      },
      {
          title: ' - Jquery Survey',
					  description: 'lorem'

      },
  ]
})
