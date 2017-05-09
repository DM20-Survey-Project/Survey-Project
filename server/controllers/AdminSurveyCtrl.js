const surveysModel = require('./../models/SurveysModel');
const usersModel = require('./../models/UserModel');
const resultsModel = require('./../models/ResultsModel');
const cohortModel = require('./../models/CohortModel');
const topicsModel = require('./../models/TopicsModel.js');
const templatesModel = require('./../models/TemplatesModel');
const mongoose = require('mongoose');

// const _ = require('underscore');
// const ObjectId = mongoose.Types.ObjectId;
// const axios = require('axios');


module.exports = {

    // create(req, res) {
    //     console.log('Admin survey creation');
    //
    //     let newSurvey = new surveysModel(req.body);
    //     let cohort_id = newSurvey.cohortSentTo;
    //     usersModel
    //         .find({ cohort: cohort_id }, '_id')
    //         .exec((err, result) => {
    //             if (err) {
    //                 console.log('error creating admin survey', err);
    //                 return res.status(500).send(err);
    //             } else {
    //                 newSurvey._doc.usersSentTo = [];
    //                 newSurvey._doc.usersUntaken = [];
    //                 result.forEach(function(response, index, array) {
    //                     newSurvey._doc.usersSentTo.push(response._doc._id);
    //                 })
    //                 newSurvey.save(function(er, re) {
    //                     if (er) {
    //                         return res.status(500).send(err);
    //                     } else {
    //                         cohortModel.findOne({
    //                                 'dmCohortId': cohort
    //                             })
    //                             .populate('topic')
    //                             .exec((cohortErr, cohortResult) => {
    //                                 let channel = cohortResult.slack_channel,
    //                                     payload = {
    //                                         channel: '#' + channel,
    //                                         text: 'A new survey has been posted for ' + req.body.name + ', on ' + req.body.topic.name + '. <http://localhost:3000/!#/|Click to take it>.'
    //                                     };
    //                                axios.post('https://hooks.slack.com/services/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', payload).then(function(slackResult) {
    //                                     console.log('Slack post success');
    //                                 }, function(slackErr) {
    //                                     console.log('Error posting to Slack:', slackErr.data);
    //                                 });
    //                             });
    //                         res.send(re);
    //                         console.log('creating admin survey success');
    //                     }
    //                 });
    //             }
    //         });
    // },

    create(req, res) {
      console.log('Admin survey creation');
//////// Set variables to hold our survey contents ////////
      var newSurvey = new surveysModel(req.body)
      var cohort_id = newSurvey.cohortSentTo;
//////// Create survey for a specific cohort, set an array to hold all users sent to and users untaken from that cohort ////////
        usersModel
            .find({ 'cohortId': cohort_id })
            .exec(function(error, result) {
              console.log(result);
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
                    newSurvey.save(function(er, re) {
                        if (er)
                            return res.status(500).send(er);
                        else
                            res.send(re);
                    });
                }
            });

    },

    read(req, res) {
        console.log('Admin read surveys');
//////// If survey was sent to a cohort, split
        if (req.query.cohortSentTo) {
            let filteredQuery = Object.keys(req.query).reduce(function(prev, cur) {
                let ary = req.query[cur].split(',');
                console.log(ary)
                if (cur == 'topic') {
                    if (ary.length > 1) {
                        prev[cur] = {
                            $in: ary.map(function(x) {
                                return new ObjectId(x);
                            })
                        }
                    } else {
                        prev[cur] = ObjectId(req.query[cur]);
                    }
                } else {
                    if (ary.length > 1) {
                        prev[cur] = { $in: ary }
                    } else {
                        prev[cur] = req.query[cur]
                    }
                }
                return prev;
            }, {});
            surveysModel.find(filteredQuery)
                .sort("-dateSent")
                .limit(50)
                .exec(function(err, result) {
                    if (err) {
                        console.log('Error reading survey: ', err)
                        return res.status(500).send(err);
                    } else {
                        return res.send(result)
                    }
                })
        } else if (req.query.campus) {
            cohortModel
                .find({
                    'location.city': req.query.campus
                })
                .exec(function(err, result) {
                    if (err) console.log(err);
                    let cohortsIds = [];

                    result.forEach(function(c) {
                        if (!cohortsIds.indexOf(c.dmCohortId) > -1) {
                            cohortsIds.push(c.cohort);
                        }
                    });
                    surveysModel.find({
                            cohortSentTo: {
                                $in: cohort
                            }
                        })
                        .sort('-dateSent')
                        .limit(30)
                        .exec(function(err, surveyResult) {
                            if (err) console.log(err)
                            res.send(surveyResult);
                        });
                });
        } else {
            cohortModel.find(req.query)
                .exec(function(err, result) {
                    if (err) {
                        console.log('error cohort req query: ', err);
                        return res.status(500).send(err);
                    } else {
                        res.send(result);
                    }
                });
        }
    },

    readOne(req, res) {
        console.log('Admin read survey by ID');
//////// Search surveys model to find a survey with a matching ID ////////
        surveysModel.findById(req.params.id)
            .exec((err, result) => {
                if (err) {
                    console.log('error reading admin survey by ID ', err);
                    return res.status(500).send(err);
                } else {
                res.send(result);
                console.log('reading admin survey by ID success');
              }
            });
    },

    readNamesAndDates(req, res) {
        console.log('Admin read survey names and dates');
//////// Go to surveys model and pull name and date sent, sort them in descending order ////////
        surveysModel.find({}, 'name dateSent')
            .sort({
                dateSent: 'desc'
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
//////// Pull a survey by ID from the results model ////////
        resultsModel.find({ survey: req.params.id })
            .exec((err, result) => {
                if (err) {
                    console.log('error reading admin survey results');
                    return res.status(500).send(err);
                } else {
                    res.send(result);
                    console.log('reading admin survey results success');
                }
            });
    },

    queryResults(req, res) {
        console.log(req.query);
        if (req.query.topic) {
            req.query.topic = new ObjectId(req.query.topic);
        }
        console.log(req.query);
        resultsModel.find(req.query)
            .exec(function(err, result) {
                if (err) {
                    console.log(err);
                    return res.status(500).send(err);
                }
                return res.send(result);
            })
    },

    readSentTo(req, res) {
        console.log('Admin read who survey was sent to');
//////// Go into surveys model, grab a survey by ID and displays usersSentTo ////////
        surveysModel.findById(req.params.survey_id, 'usersSentTo')
            .exec((err, result) => {
                if (err) {
                    console.log('error reading who survey was sent to');
                    return res.status(500).send(err);
                } else {
//////// If theres no error go into users and find user ID and see if it matches any in Users sent to, if it does give first and last names ////////
                    usersModel
                        .find({ '_id': { $in: result._doc.usersSentTo }}, 'firstName lastName')
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
//////// search surveys model by a surveys ID and pull the usersUntaken and the cohort it was sent to ////////
        surveysModel.findById(req.params.survey_id, 'usersUntaken cohortSentTo')
            .exec((err, result) => {
                if (err) {
                    console.log('error reading users who have not taken survey');
                    return res.status(500).send(err);
                } else {
//////// No errors search users ID and check to see if they are NOT in the array of usersUntaken, but in the cohort the survey was sent to ////////
                    usersModel
                        .find({
                          '_id': { $nin: result._doc.usersUntaken },
                          'cohortId': result._doc.cohortSentTo },
                          'first_name last_name')
                        .exec((er, re) => {
                            if (er)
                                return res.status(500).send(er);
                            else
                                res.send(re);
                        });
                }
            });
    },
    readAnalyticsResults(req, res) {
//////// Search cohort model and find an ID matching the requested ID ////////
        cohortModel.findOne({
            dmCohortId: req.params.id
        }, function(err, results) {
//////// Send the results of the found survey ////////
            console.log(req.params.id, '\n\n', results);
            res.send(results);
        })
    },
    readFilterOptions(req, res) {
//////// Search a cohort by the requested query and give back Id, name, nickname, location, and weather the cohort is active or not ////////
        cohortModel.find(req.query).select("dmCohortId name nickname location active").exec(function(err, cohorts) {
            cohorts = _.groupBy(cohorts, function(x) {
                return x.location.city;
            });
//////// Find a topic name and ID and send back cohorts and topics ////////
            topicsModel.find({}).select("_id name").exec(function(err, topics) {
                if (err) {
                    return res.sendStats(500);
                }
                res.send({
                    cohorts: cohorts,
                    topics: topics
                })
            })
        });

    }

    // weeklySurvey: function(req, res) {
    //
    //     cohortModel.find({
    //         active: true
    //     }, function(err, activeCohorts) {
    //         if (err) console.log('Error getting active Cohorts', err);
    //
    //         //console.log('sdfjlasjfsadjfasjdflsajlfjsdl;ajs',activeCohorts)
    //
    //         topicsModel.findOne({
    //             name: 'Weekly Review/Feedback'
    //         }, function(err, topic) {
    //             if (err) console.log('Error finding topic', err);
    //
    //             templatesModel.findOne({
    //                     name: 'Weekly Review/Feedback'
    //                 })
    //                 .lean()
    //                 .exec(function(err, surveyTemplate) {
    //                     if (err) console.log('Error finding survey template', err);
    //
    //                     activeCohorts.forEach(function(cohort) {
    //                         var date = new Date();
    //                         surveyTemplate.cohortSentTo = cohort.dmCohortId;
    //                         surveyTemplate.dateSent = date;
    //                         surveyTemplate.topic = topic;
    //
    //                         (function(surv) {
    //                             var surv1 = Object.assign({}, surv); // Avoiding passing by reference
    //
    //                             axios({
    //                                 method: 'post',
    //                                 url: 'http://localhost:8002/api/admin/surveys',
    //                                 data: surv1,
    //                                 headers: {
    //                                     'Authorization': 'houstonWeHaveAProblem'
    //                                 }
    //                             })
    //
    //                         })(surveyTemplate);
    //                     });
    //
    //                     res.end();
    //                 });
    //         });
    //     });
    // }
}
