const templatesModel = require('./../models/TemplatesModel');

module.exports = {

    create(req, res) {
        console.log('Creating new template...');

        let newTemplate = new templatesModel(req.body)
        newTemplate.save((err, result) => {
            if (err)
                return res.status(500).send(err);
            else
                res.send(result);
        });
    },

    read(req, res) {
      console.log('Reading template...');
      templatesModel.findById(req.params.id)
        .exec((err, result) => {
          if (err) {
            console.log('errors reading survey template', err);
            return res.status(500).send(err);
          }
          else {
            res.send(result);
          }
        });
    },

    readNames(req, res) {
      console.log('Reading template names');
      templatesModel.find({}, 'title questions')
        .sort({ name: 'asc' })
        .exec((err, result) => {
          if (err) {
            console.log('Error reading template name');
            return res.status(500).send(err);
          }
          else {
            res.send(result);
          }
        });
    },

    update(req, res) {
      console.log('Updating template...');
      templatesModel.findById(req.params.id)
        .exec((err, result) => {
          if (err) {
            return res.status(500).send(err);
          }
          else {
            for (var p in req.body) {
              if (req.body.hasOwnProperty(p)) {
                result[p] = req.body[p];
              }
            }
            result.save((er, re) => {
              if (er)
                return res.status(500).send(er);
              else
                res.send(re);
            });
          }
        });
    },

    delete(req, res) {
      console.log('Deleting template...');
      templatesModel.findByIdAndRemove(req.params.id)
        .exec((err, result) => {
          if (err) {
            return res.status(500).send(err);
          }
          else {
            res.send(result);
          };
        })
    }

}
