angular.module('surveyApp').service('entityService', function() {
  this.getEntities = function (requestedEntites) {
      var response = []
      for (var i = 0; i < requestedEntites.length; i++) {
          switch (requestedEntites[i]) {
            case 'mentor':
                response.push(mentors)
                break;
            case 'cohort':
                response.push(cohorts)
                break;
        
            case 'topic':
                response.push(topics)
                break;
        
            default:
                break;
          }
          
      }
      return response
  }


  var mentors = {
        type: 'mentor',
        entities: [
      {
          name: 'Michael Memory',
          id: 1,
          location: {
              city: 'Provo',
              state: 'Utah'

          },

      },
      {
          name: 'Max Rodewald',
          id: 2,
          location: {
              city: 'Provo',
              state: 'Utah'

          },
          
      },
      {
          name: 'Brett Gardiner',
          id: 3,
          location: {
              city: 'Provo',
              state: 'Utah'

          },
          
      },
      {
          name: 'Bingo Jackson',
          id: 4,
          location: {
              city: 'Salt Lake City',
              state: 'Utah'

          },
          
      },
      {
          name: 'HeeHaw Horseman',
          id: 5,
          location: {
              city: 'Salt Lake City',
              state: 'Utah'

          },
          
      },
      {
          name: 'Gunsmoke',
          id: 6,
          location: {
              city: 'Salt Lake City',
              state: 'Utah'

          },
          
      },
      {
          name: 'Michael Memory',
          id: 7,
          location: {
              city: 'Provo',
              state: 'Utah'

          },

      },
      {
          name: 'Max Rodewald',
          id: 8,
          location: {
              city: 'Provo',
              state: 'Utah'

          },
          
      },
      {
          name: 'Brett Gardiner',
          id: 9,
          location: {
              city: 'Provo',
              state: 'Utah'

          },
          
      },
      {
          name: 'Bingo Jackson',
          id: 10,
          location: {
              city: 'Salt Lake City',
              state: 'Utah'

          },
          
      },
      {
          name: 'HeeHaw Horseman',
          id: 11,
          location: {
              city: 'Salt Lake City',
              state: 'Utah'

          },
          
      },
      {
          name: 'Gunsmoke',
          id: 12,
          location: {
              city: 'Salt Lake City',
              state: 'Utah'

          },
          
      },
    ],
    }

  var cohorts = {
        type: "cohort",
        entities: [
        {
            name: 'DM20',
            id: 1,
            location: {
              city: 'Provo',
              state: 'Utah'

          },
        },
        {
            name: 'DMTEST',
            id: 350,
            location: {
              city: 'Provo',
              state: 'Utah'

          },
        },
        {
            name: 'DM19',
            id: 2,
            location: {
              city: 'Provo',
              state: 'Utah'

          },
        },
        {
            name: 'DM18',
            id: 3,
            location: {
              city: 'Provo',
              state: 'Utah'

          },
        },
        {
            name: 'iOS20',
            id: 4,
            location: {
              city: 'Salt Lake City',
              state: 'Utah'

          },
        },
        {
            name: 'iOS19',
            id: 5,
            location: {
              city: 'Salt Lake City',
              state: 'Utah'

          },
        },
        {
            name: 'iOS18',
            id: 6,
            location: {
              city: 'Salt Lake City',
              state: 'Utah'

          },
        },
    ]
}

var topics = {
        type: "topic",
        entities: [
        {
            name: 'Jquery',
            id: 1
            
        },
        {
            name: 'Angular',
            id: 2
            
        },
        {
            name: 'HTML/CSS',
            id: 3
            
        },
        {
            name: 'React',
            id: 4
            
        },
        {
            name: 'Mentoring',
            id: 5
            
        },
    ]
    }
  
})