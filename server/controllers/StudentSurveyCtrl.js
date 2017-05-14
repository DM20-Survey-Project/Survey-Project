const surveysModel = require('.././models/SurveysModel');
const usersModel = require('.././models/UserModel');
const resultsModel = require('.././models/ResultsModel');

module.exports = {

    create(req, res) {
        console.log('Student create survey results');
        surveysModel.findById(req.body.surveyId)
            .exec((error, result) => {
                if (error) {
                    res.status(500).send(error);
                } else {
                    result.results.push(req.body.results)
                    if (result.usersUntaken) {
                        var indx = result.usersUntaken.indexOf(req.body.userId);
                        if (indx !== -1) {
                            result.usersUntaken.splice(indx, 1)
                            result.save((er, re) => {
                                if (er) {
                                    return res.status(500).send(er);
                                } else {
                                    res.send(re);
                                }
                            });
                        }

                    }
                }
            })
    },
    read(req, res) {
        console.log('Student read survey');
        surveysModel
            .findById(req.params.id, 'title description topic questions')
            .exec((err, result) => {
                if (err) {
                    return res.status(500).send(err);
                } else {
                    res.send(result)
                }
            })
    },
    readUntaken(req, res) {
        console.log('Student readUntaken');
        surveysModel
            .find({
                usersUntaken: req.params.student_id
            }, 'title description')
            .exec((err, result) => {
                if (err) {
                    return res.status(500).send(err);
                } else {
                    res.send(result)
                }
            })
    }
}
