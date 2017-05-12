angular.module('surveyApp').service('entityService', function($http) {
  this.getEntities = function(data) {
      var entityPackage = {
          types: data
      }
        return $http({
            method: 'POST',
            url: '/api/entities',
            data: entityPackage
        }).then(function (response) {
            console.log(response.data);
            return response
        })
    }
    this.addEntity = function(data) {
      
        return $http({
            method: 'POST',
            url: '/api/addentity',
            data: data
        }).then(function (response) {
            console.log(response.data);
            return response
        })
    }

    this.deleteEntity = function(data) {
      
        return $http({
            method: 'DELETE',
            url: '/api/entities/' + data
        }).then(function (response) {
            console.log(response.data);
            return response
        })
    }


  var mentors = {
        type: 'mentor',
        entities: [
      {
          name: 'Michael Memory',
          id: 1,
          type: 'mentor',
          location: {
              city: 'Provo',
              state: 'Utah'

          },

      },
      {
          name: 'Max Rodewald',
          id: 2,
          type: 'mentor',
          location: {
              city: 'Provo',
              state: 'Utah'

          },
          
      },
      {
          name: 'Brett Gardiner',
          id: 3,
          type: 'mentor',
          location: {
              city: 'Provo',
              state: 'Utah'

          },
          
      },
      {
          name: 'Bingo Jackson',
          id: 4,
          type: 'mentor',
          location: {
              city: 'Salt Lake City',
              state: 'Utah'

          },
          
      },
      {
          name: 'HeeHaw Horseman',
          id: 5,
          type: 'mentor',
          location: {
              city: 'Salt Lake City',
              state: 'Utah'

          },
          
      },
      {
          name: 'Gunsmoke',
          id: 6,
          type: 'mentor',
          location: {
              city: 'Salt Lake City',
              state: 'Utah'

          },
          
      },
      {
          name: 'Michael Memory',
          id: 7,
          type: 'mentor',
          location: {
              city: 'Provo',
              state: 'Utah'

          },

      },
      {
          name: 'Max Rodewald',
          id: 8,
          type: 'mentor',
          location: {
              city: 'Provo',
              state: 'Utah'

          },
          
      },
      {
          name: 'Brett Gardiner',
          id: 9,
          type: 'mentor',
          location: {
              city: 'Provo',
              state: 'Utah'

          },
          
      },
      {
          name: 'Bingo Jackson',
          id: 10,
          type: 'mentor',
          location: {
              city: 'Salt Lake City',
              state: 'Utah'

          },
          
      },
      {
          name: 'HeeHaw Horseman',
          id: 11,
          type: 'mentor',
          location: {
              city: 'Salt Lake City',
              state: 'Utah'

          },
          
      },
      {
          name: 'Gunsmoke',
          id: 12,
          type: 'mentor',
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
            id: 1,
            type: 'topic',
            
        },
        {
            name: 'Angular',
            id: 2,
            type: 'topic',
            
        },
        {
            name: 'HTML/CSS',
            id: 3,
            type: 'topic',
            
        },
        {
            name: 'React',
            id: 4,
            type: 'topic',
            
        },
        {
            name: 'Mentoring',
            id: 5,
            type: 'topic',
            
        },
    ]
    }
  
})

