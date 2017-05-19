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

    var currentTemplate = {

    }
    this.getSelectedTemplate = function() {
        return currentTemplate
    }
    this.giveSelected = function(template) {
        currentTemplate.template = template
        currentTemplate.types = this.parseTitle(template.title)
    }
    this.parseTitle = function(title) {
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

})
