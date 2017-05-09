angular.module('surveyApp').service('userService', function() {

var surveysColumn1 = [{}];
var surveysColumn2 = [{}];
  this.getUser = function () {
    var surveys = {
      column1: [],
      column2: []
    }
    for(var i=0;i < recentSurveys.length; i++){
          if(i%2 === 0){

            surveys.column1.push(recentSurveys[i])


          } else  {
              surveys.column2.push(recentSurveys[i])
          }

        }

  return surveys
  }


  // this.getUser = function() {
  //   return recentSurveys
  // }
  var recentSurveys = [
      {

          title: 'DM20-Brett Rheiner',
        description: 'Mentor Survey on your personal mentor. 10 questions on your overall rating of your mentor sajdhjhasdkfhklj kjl jkasdhfklj a skljdf jkla kdjajsdh fklj asdf klasdf kjasdf kasdf kjsdf kaskjf kljasdf lkhasdjf klj asdfgakl rgfiuqohrou asdlkjl ;iasdh '
      },
      {
          title: 'DM20 - Week 2 Survey'

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
      {
          classTitle: 'DM21',
          title: 'DM20-MAXXiliion Rheiner'

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
