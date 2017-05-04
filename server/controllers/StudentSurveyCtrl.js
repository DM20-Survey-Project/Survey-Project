const surveysModel = require('./../models/SurveysModel');
const usersModel = require('./../models/UserModel');
const resultsModel = require('./../models/ResultsModel');

module.exports = {
    create(req, res) {
        console.log('Student survey side');

        let newResults = new resultsModel(req.body);
        newResults.save((error, result) => {
            if (error) {
                console.log('Error in student survey', error);
                return res.status(500).send(error);
            } else {
                let surveyUser = newResults._doc.user;
                let survey = newResults._doc.survey;

                surveysModel.findById(survey)
                    .exec((err, resul) => {
                        if (err) {
                            console.log('error finding student survey by id');
                            return res.status(500).send(err);
                        } else {
                            if (resul._doc.usersUntaken) {
                                let indx = resul._doc.usersUntaken.indexOf(surveyUser);
                                if (indx !== -1) {
                                    resul._doc.usersUntaken.splice(indx, 1)
                                    resul.save((er, re) => {
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
        console.log('get student surveys');
        surveysModel.findById(req.params.id, 'name description topic questions')
            .exec((err, result) => {
                if (err) {
                    console.log('error reading student surveys', err);
                    return res.status(500).send(err);
                } else {
                    res.send(result);
                }
            });
    },


    readUntaken(req, res) {
      console.log('get untaken student surveys');
      surveysModel.find({ usersUntaken: req.params.student_id }, 'name')
        .exec((err, result) => {
          if (err) {
            console.log('error reading untaken student surveys', err);
            return res.status(500).send(err);
          }
          else {
            res.send(result);
          }
        })
    }

}
