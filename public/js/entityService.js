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

})
