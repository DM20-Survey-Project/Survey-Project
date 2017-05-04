angular.module('surveyApp').service('entityService', function() {
  this.getEntities = function () {
      return entities
  }
  var entities = {
    mentors: {
        type: 'Mentor',
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
    },
    cohorts: {
        type: "Cohort",
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
  }
})