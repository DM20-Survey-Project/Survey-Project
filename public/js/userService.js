angular.module('surveyApp').service('userService', function() {
  this.getUser = function () {
      return {
				surveysA: recentSurveys,
        surveysB: recentSurveysB
			}
  }
  var recentSurveys = [
      {

          title: 'DM20-Brett Rheiner',
        description: 'Mentor Survey on your personal mentor. 10 questions on your overall rating of your mentor sajdhjhasdkfhklj kjl jkasdhfklj a skljdf jkla kdjajsdh fklj asdf klasdf kjasdf kasdf kjsdf kaskjf kljasdf lkhasdjf klj asdfgakl rgfiuqohrou asdlkjl ;iasdh '
      },
      {
          title: 'DM20 - Week 2 Survey',
					  description: 'lorem'
      },
      {
          title: 'DM20 - Week 3 Survey',
					  description: 'lorem'
      },
      {
          title: 'DM20 - Week 4 Survey',
					  description: 'lorem'
      },
      {
          title: 'DM20 - Week 5 Survey',
					  description: 'lorem'
      },
      {
          title: 'Michael Memory - DM20 - Survey',
					  description: 'lorem'
      },
      {
          title: 'DM20 - Jquery Survey',
					  description: 'lorem'

      },
  ]

  var recentSurveysB = [
      {
          classTitle: 'DM21',
          title: 'DM20-Brett Rheiner',
        description: 'Mentor Survey on your personal mentor. 10 questions on your overall rating of your mentor'
      },
      {
          title: 'DM20 - Week 2 Survey',
					  description: 'lorem'
      },
      {
          title: 'DM20 - Week 3 Survey',
					  description: 'lorem'
      },
      {
          title: 'DM20 - Week 4 Survey',
					  description: 'lorem'
      },
      {
          title: 'DM20 - Week 5 Survey',
					  description: 'lorem lasihdfo hhasdfoih oph asdfjhasldkjhfjkhaskldjhfklj hkljasdhf   kj hadjf haskjdh kjasd fkjhakldjf hklajsd klj hkajsdf khasj kdhfklj asdfklj askljdf hjakljasdkljh fklj asdfhjk'
      },
      {
          title: 'Michael Memory - DM20 - Survey',
					  description: 'lorem'
      },
      {
          title: 'DM20 - Jquery Survey',
					  description: 'lorem'

      }
  ]

})
