const surveysModel = require('.././models/SurveysModel');
const usersModel = require('.././models/UserModel');
const resultsModel = require('.././models/ResultsModel');

module.exports = {

    create(req, res) {
        console.log('in studentSurveyCtrl create');
        console.log('req.body = ', req.body);

        var newResults = new resultsModel(req.body)
        newResults.save(function(error, result) {
            if (error)
                return res.status(500).send(error);
            else {
                var surveyUser = newResults._doc.user;
                var survey = newResults._doc.survey;
                console.log('after newResults save');
                console.log('surveyUser', surveyUser);
                console.log('survey', survey);
                surveysModel
                    .findById(survey)
                    .exec(function(err, resul) {
                        if (err) {
                            console.log('in error routine');
                            return res.status(500).send(err);
                        } else {
                            console.log('After findById(survey)');
                            console.log('resul', resul);
                            if (resul._doc.usersUntaken) {
                                var indx = resul._doc.usersUntaken.indexOf(surveyUser);
                                if (indx !== -1) {
                                    resul._doc.usersUntaken.splice(indx, 1)
                                    resul.save(function(er, re) {
                                        if (er)
                                            return res.status(500).send(er);
                                        else
                                            res.send(re);
                                    });
                                }

                            }
                        }
                    });
            }
        });
    },

    read(req, res) {
        console.log('in studentSurveyCtrl');
        console.log('in read');
        console.log('req.params = ', req.params)
        surveysModel
            .findById(req.params.id, 'name description topic questions')
            .exec(function(err, result) {
                console.log('err', err);
                console.log('result', result);
                if (err) {
                    console.log('in error routine');
                    return res.status(500).send(err);
                } else {
                    res.send(result)
                }
            })
    },

    readUntaken(req, res) {
        console.log('in studentSurveyCtrl');
        console.log('in readUntaken');
        console.log('req.params = ', req.params)
        surveysModel
            .find({ usersUntaken: req.params.student_id }, 'name description')
            .exec(function(err, result) {
                console.log('err', err);
                console.log('result', result);
                if (err) {
                    console.log('in error routine');
                    return res.status(500).send(err);
                } else {
                    res.send(result)
                }
            })
    }
}
