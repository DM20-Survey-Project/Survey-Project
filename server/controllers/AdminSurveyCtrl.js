const surveysModel = require('./../models/SurveysModel');
const usersModel = require('./../models/UserModel');
const cohortModel = require('./../models/CohortModel');
const templatesModel = require('./../models/TemplatesModel');
const mongoose = require('mongoose');

module.exports = {

    create(req, res) {
        console.log('Admin create survey');
        //////// Set variables to hold our survey contents ////////
        req.body.dateSent = Date.now();
        let newSurvey = new surveysModel(req.body)
        let cohort_id = newSurvey.cohortSentTo;
        let templateId = newSurvey.templateId
        console.log('rec ', templateId)
        templatesModel.find({
                '_id': templateId
            })
            .exec((error, result) => {
                result[0].recentUse = Date.now();
                console.log('result ', result)
                result[0].save()
            })
        //////// Create survey for a specific cohort, set an array to hold all users sent to and users untaken from that cohort ////////
        usersModel
            .find({
                'cohortId': cohort_id
            })
            .exec((error, result) => {
                if (error) {
                    return res.status(500).send(error);
                } else {
                    newSurvey._doc.usersSentTo = [];
                    newSurvey._doc.usersUntaken = [];
                    //////// Push the found users by their cohortId into the arrays ////////
                    result.forEach(function(resul, index, array) {
                        newSurvey._doc.usersSentTo.push(resul._doc._id);
                        newSurvey._doc.usersUntaken.push(resul._doc._id);
                    })
                    //////// Save the survey if no errors ////////
                    newSurvey.save((er, re) => {
                        if (er)
                            return res.status(500).send(er);
                        else
                            res.send(re);
                    });
                }
            });
    },
    read(req, res) {
        console.log('Admin read survey');
        surveysModel
            .find(req.query)
            .sort({
                dateSent: 'desc'
            })
            .exec((err, result) => {
                if (err) {
                    return res.status(500).send(err);
                } else {
                    res.send(result)
                }
            })
    }
}
