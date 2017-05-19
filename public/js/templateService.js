angular.module('surveyApp').service('templateService', function($http) {
  
    this.getTemplates = function() {
        return $http({
            method: 'GET',
            url: '/api/admin/templates'
        })
    }
    this.deleteTemplate = function(id) {
        return $http({
            method: 'DELETE',
            url: '/api/admin/templates/' + id
        })
    }
    this.updateTemplate = function(data) {
        console.log(data);
        return $http({
            method: 'POST',
            url: '/api/admin/templates',
            data: data
        })
    }

})
