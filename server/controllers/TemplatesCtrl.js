const templatesModel = require('./../models/TemplatesModel');

module.exports = {

    createOrUpdate(req, res) {
      console.log('Create or update template');
        req.body.recentUse = Date.now();
        let newTemplate = new templatesModel(req.body)
        // console.log('req body', req.body)
        console.log(newTemplate);
        if (!req.body._id) {
          console.log('Creating new template');
            newTemplate.save((err, result) => {
                if (err) {
                    return res.status(500).send(err);
                } else {
                    res.send(result);
                }
            })
        } else {
          console.log('Updating template');
            templatesModel.findById(newTemplate)
                .exec((err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    } else {

                        for (var p in newTemplate) {
                            if (req.body.hasOwnProperty(p)) {
                                result[p] = req.body[p];
                            }
                        }
                        result.save((er, re) => {
                            if (er) {
                                return res.status(500).send(er);
                            } else {
                                res.send(re);
                            }
                        });
                    }
                })
        }
    },
    read(req, res) {
        console.log('Reading template');
        templatesModel.findById(req.params.id)
            .exec((err, result) => {
                if (err) {
                    return res.status(500).send(err);
                } else {
                    res.send(result);
                }
            });
    },
    readNames(req, res) {
        console.log('Reading template names');
        templatesModel.find({}, 'title questions')
            .sort({
                title: 'asc'
            })
            .exec((err, result) => {
                if (err) {
                    return res.status(500).send(err);
                } else {
                    res.send(result);
                }
            });
    },
    // update(req, res) {
    //   console.log('Updating template');
    //   templatesModel.findById(req.params.id)
    //     .exec((err, result) => {
    //       if (err) {
    //         return res.status(500).send(err);
    //       }
    //       else {
    //         for (var p in req.body) {
    //           if (req.body.hasOwnProperty(p)) {
    //             result[p] = req.body[p];
    //           }
    //         }
    //         result.save((er, re) => {
    //           if (er) {
    //             return res.status(500).send(er);
    //           } else {
    //             res.send(re);
    //           }
    //         });
    //       }
    //     });
    // },
    delete(req, res) {
        console.log('Deleting template');
        templatesModel.findByIdAndRemove(req.params.id)
            .exec((err, result) => {
                if (err) {
                    return res.status(500).send(err);
                } else {
                    res.send(result);
                };
            })
    }
}
