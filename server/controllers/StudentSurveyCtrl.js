var surveysModel = require('.././models/SurveysModel');
var usersModel = require('.././models/UserModel');
var resultsModel = require('.././models/ResultsModel');
var usersCtrl = require('./UserCtrl');
// var ObjectId = require('/mongojs').ObjectId;

function crudRead(req, res){
    console.log('in studentSurveyCtrl');
    console.log('in read');
    console.log('req.params = ', req.params)

    surveysModel
        .findById(req.params.id, 'name description topic questions')
        .exec(function (err, result) {
            console.log('err', err);
            console.log('result', result);
            if (err) {
                console.log('in error routine');
                return res.status(500).send(err);
            }
            else {
                res.send(result)
            }
        })
}

function crudGetUntaken(req, res){
    console.log('in studentSurveyCtrl');
    console.log('in readUntaken');
    console.log('req.params = ', req.params)

    var lastWeek = new Date(new Date().getTime()-1000*60*60*24*7);

    console.log("last week", lastWeek);

    surveysModel
        .find({$or:[
          {cohort_id:-1, dateSent:{$gte:lastWeek}, usersTaken: { $ne: req.params.student_id }},{
          cohortSentTo: req.params.cohort_id,
          $or:[
            {usersTaken: { $ne: req.params.student_id } },
            {repeatable:true}]
          }]},
          'name usersTaken optional repeatable')
        .exec(function (err, result) {
            console.log('err', err);
            console.log('result', result);
            if (err) {
                console.log('in error routine');
                return res.status(500).send(err);
            }
            else {
                res.send(result)
            }
        })
}

function getUntakenByUserQueryFirst(req, res){
     function getSurveys(result, err){
            if(result && !err){
                req.params.student_id = result._doc._id.toString();
                req.params.cohort_id = result._doc.cohortId.toString();
                crudGetUntaken(req, res);
            } else {
                res.status(200).send({message: "No user found for that query"});
            }
        }
        if(req.query.dm_id){
            req.query.dm_id = {$in:[req.query.dm_id/1,-1]};
        }
        usersCtrl.getUserByQuery(req.query)
            .then(
                getSurveys,
                function (err) {
                    console.log('in error routine');
                    return res.status(500).send(err);
                });
}


module.exports = {

    create: function (req, res) {

        console.log('in studentSurveyCtrl');
        console.log('in create');
        console.log('req.body = ', req.body);

        var newResults = new resultsModel(req.body)
        newResults.save(function (error, result) {
            if (error)
                return res.status(500).send(error);
            else {
                var surveyUser = newResults._doc.user;
                var survey = newResults._doc.survey;
                console.log('after newResults.save');
                console.log('surveyUser', surveyUser);
                console.log('survey', survey);
                surveysModel
                    .findById(survey)
                    .exec(function (err, resul) {
                        if (err) {
                            console.log('in error routine');
                            return res.status(500).send(err);
                        }
                        else {
                            console.log('After findById(survey)');
                            console.log('resul', resul);
                            if (resul._doc.usersTaken) {
                                resul._doc.usersTaken.push(surveyUser)
                                resul.save(function (er, re) {
                                    if (er)
                                        return res.status(500).send(er);
                                    else
                                        res.send(re);
                                });

                            }
                        }
                    });
            }
        });
    },

    read: crudRead,

    getUntakenByUser: function (req, res) {
       getUntakenByUserQueryFirst(req, res)
    },

    readUntaken: function (req, res) {
      req.query = {_id: req.params.student_id};
      getUntakenByUserQueryFirst(req, res);
    }
  }
