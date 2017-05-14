const topicsModel = require('./../models/TopicsModel');

module.exports = {

    create(req, res) {
        console.log('Creating new topic');
        let newTopic = new topicsModel(req.body)
        newTopic.save((err, result) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                res.send(result);
            }
        });
    },
    read(req, res) {
        console.log('Reading topic');
        topicsModel.find(req.query)
            .sort({ name: 'asc' })
            .exec((err, result) => {
                if (err) {
                    return res.status(500).send(err);
                } else {
                    res.send(result);
                }
            });
    },
    delete(req, res) {
        console.log('Deleting topic');
        topicsModel.findByIdAndRemove(req.params.id)
            .exec((err, result) => {
                if (err) {
                    return res.status(500).send(err);
                } else {
                    res.send(result);
                }
            });
    }
}
