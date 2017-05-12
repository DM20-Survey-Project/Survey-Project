const entitiesModel = require('./../models/EntitiesModel');
const cohortModel = require('./../models/CohortModel');
const mongoose = require('mongoose');

module.exports = {

    create(req, res) {
        console.log('Creating new entity...');
        console.log(req.body);
        let newEntity = new entitiesModel(req.body)
        newEntity.save((err, result) => {
            if (err)
                return res.status(500).send(err);
            else
                res.send(result);
        });
    },

    readByType(req, res) {
        console.log('Reading entity by type...');
        console.log(req.body);
        var entities = req.body.types;
        var entityPackage = [];
        var index = -1;
        for (var i = 0; i < entities.length; i++) {
          index++
            if (entities[i] === 'cohort') {
                cohortModel.find({}, 'dmCohortId type subject name location')
                  .exec(function(err, result) {
                    if (err) {
                      console.log('in error routine');
                      return res.status(500).send(err);
                    } else {
                      // console.log('result ', result)
                      var cohortPayload = {
                          type: 'cohort',
                          entities: result
                      }
                      entityPackage.push(cohortPayload)
                      if (entityPackage.length === entities.length) {
                          res.send(entityPackage)
                      }
                    }
                  })
            }
            else {
                var searchType = entities[i];
                entitiesModel.find({ type: searchType })
                    .exec(function(err, result) {
                        // console.log('err', err);
                        // console.log('result', result);
                        if (err) {
                            console.log('in error routine');
                            return res.status(500).send(err);
                        } else {
                          if (result.length === 0) {
                            var payload = {
                              type: entities[index],
                              entities: []
                            }
                          }
                          else {
                            var payload = {
                              type: result[0].type,
                              entities: result
                            }
                          }
                            // console.log('Payload ', payload)
                            entityPackage.push(payload)
                            // index++
                            if (entityPackage.length === entities.length) {
                                // console.log('Package ', package)
                                // console.log('index', result[0])
                                res.send(entityPackage)
                            }
                        }
                    })
            }
        }

    },

    delete(req, res) {
        console.log('Deleting topic...');
        entitiesModel.findByIdAndRemove(req.params.id)
            .exec((err, result) => {
                if (err) {
                    console.log('error deleting topic', err)
                    return res.status(500).send(err);
                } else {
                    res.send(result);
                }
            });
    }

}
