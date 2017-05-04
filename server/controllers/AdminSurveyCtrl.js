const surveysModel = require('./../models/SurveysModel');
const usersModel = require('./../models/UserModel');
const resultsModel = require('./../models/ResultsModel');

module.exports = {

    create(req, res, next) {
        console.log('Admin survey creation');

        let newSurvey = new surveysModel(req.body);
        let cohort_id = newSurvey.cohortSentTo;
        usersModel.find({
                cohort: cohort_id
            }, '_id')
            .exec((err, result) => {
                if (err) {
                    console.log('error creating admin survey', err);
                    return res.status(500).send(err);
                } else {
                    newSurvey._doc.usersSentTo = [];
                    newSurvey._doc.usersUntaken = [];
                    result.forEach(function(response, index, array) {
                        newSurvey._doc.usersSentTo.push(response._doc._id);
                        newSurvey._doc.usersUntaken.push(response._doc._id);
                    });
                    newSurvey.save(function(er, re) {
                        if (er) {
                            return res.status(500).send(err);
                        }
                        res.send(re);
                        console.log('creating admin survey success');
                    });
                }
            });
    },

    read(req, res) {
        console.log('Admin read surveys');

        surveysModel.find(req.query)
            .exec((err, result) => {
                if (err) {
                    console.log('error reading admin survey ', err);
                    return res.status(500).send(err);
                }
                res.send(result);
                console.log('reading admin survey success');
            })
    },

    readOne(req, res) {
        console.log('Admin read survey by ID');
        surveysModel.findById(req.params.id)
            .exec((err, result) => {
                if (err) {
                    console.log('error reading admin survey by ID ', err);
                    return res.status(500).send(err);
                }
                res.send(result);
                console.log('reading admin survey by ID success');
            });
    },

    readNamesAndDates(req, res) {
        console.log('Admin read survey names and dates');
        surveysModel.find({}, 'name dateSent')
            .sort({
                dateSend: 'desc'
            })
            .exec((err, restult) => {
                if (err) {
                    console.log('error reading admin survey names and dates');
                    return res.status(500).send(err);
                }
                res.send(result);
                console.log('reading admin survey names and dates success');
            });
    },

    readResults(req, res) {
        console.log('Admin read survey results');
        resultsModel.find({
                survey: req.params.id
            })
            .exec((err, result) => {
                if (err) {
                    console.log('error reading admin survey results');
                    return res.status(500).send(err);
                }
                res.send(result);
                console.log('reading admin survey results success');
            });
    },

    readSentTo(req, res) {
        console.log('Admin read who survey was sent to');
        surveysModel.findById(req.params.survey_id, 'usersSentTo')
            .exec((err, result) => {
                if (err) {
                    console.log('error reading who survey was sent to');
                    return res.status(500).send(err);
                } else {
                    usersModel
                        .find({
                            '_id': {
                                $in: result._doc.usersSentTo
                            }
                        }, 'firstName lastName')
                        .exec((er, re) => {
                            if (er) {
                                return res.status(500).send(er);
                            } else {
                                res.send(re);
                            }
                        });
                }
            });
    },

    readUntaken(req, res) {
        console.log('Admin read who has not taken survey');
        surveysModel.findById(req.params.survey_id, 'usersUntaken')
            .exec((err, result) => {
                if (err) {
                    console.log('error reading users who have not taken survey');
                    return res.status(500).send(err);
                } else {
                    usersModel
                        .find({
                            '_id': {
                                $in: result._doc.usersUntaken
                            }
                        }, 'firstName lastName')
                        .exec((er, re) => {
                            if (er)
                                return res.status(500).send(er);
                            else
                                res.send(re);
                        });
                }
            });
    }
}
