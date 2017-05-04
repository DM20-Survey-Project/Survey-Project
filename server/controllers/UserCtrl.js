const usersModel = require('./../models/UserModel');

module.exports = {

    create(req, res) {
        console.log('Creating user...');
        const newUser = new usersModel(req.body);
        // newUser.password = newUser.generateHash(newUser.password);
        newUser.save((err, result) => {
            if (err)
                return res.status(500).send(err);
            else
                res.send(result);
        });
    },

    read(req, res) {
        console.log('Reading user...');
        usersModel.find(req.query)
            .exec((err, result) => {
                if (err) {
                    console.log('error reading user', err);
                    return res.status(500).send(err);
                } else {
                    res.send(result);
                }
            });
    },

//////// GET USER BY ID /////////
    // readOne(req, res) {
    //     console.log('Admin read survey by ID');
    //     surveysModel.findById(req.params.id)
    //         .exec((err, result) => {
    //             if (err) {
    //                 console.log('error reading admin survey by ID ', err);
    //                 return res.status(500).send(err);
    //             }
    //             res.send(result);
    //             console.log('reading admin survey by ID success');
    //         });
    // },

    readUsersInCohort(req, res) {
        console.log('Reading users by cohort...');
        usersModel
            .find({
                'cohort': req.params.cohort_id
            }, '_id firstName lastName')
            .exec((err, result) => {
                if (err) {
                    console.log('error reading users by cohort', err);
                    return res.status(500).send(err);
                } else {
                    res.send(result);
                }
            });
    },

    update(req, res) {
        console.log('Updating user...');
        usersModel.findById(req.params.id)
            .exec((err, result) => {
                if (err) {
                    console.log('error updating user', err);
                    return res.status(500).send(err);
                } else {
                    for (let p in req.body) {
                        if (req.body.hasOwnProperty(p)) {
                            result[p] = req.body[p];
                        }
                    }
                    result.save((er, re) => {
                        if (er)
                            return res.status(500).send(err);
                        else
                            res.send(re);
                    });
                }
            });
    },

    delete(req, res) {
        console.log('Deleting user...');
        usersModel.findByIdAndRemove(req.params.id)
            .exec((err, result) => {
                if (err) {
                    console.log('error deleting user', err);
                    return res.status(500).send(err);
                }
                else {
                    res.send(result);
                }
            });
    }

}
