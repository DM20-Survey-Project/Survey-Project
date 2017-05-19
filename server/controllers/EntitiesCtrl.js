const entitiesModel = require('./../models/EntitiesModel');
const cohortModel = require('./../models/CohortModel');
const mongoose = require('mongoose');





module.exports = {

    create(req, res) {
        console.log('Creating new entity');
        let newEntity = new entitiesModel(req.body)
        newEntity.save((err, result) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                res.send(result);
            }
        });
    },
    readByType(req, res) {
        console.log('Read entity by type');
        var entities = req.body.types;
        console.log('types', entities);
        var entityPackage = [];
        var index = -1;
        function findEntity(index, entities, entityPackage) {
    if (entities[index] === 'cohort') {
                cohortModel.find({}, 'dmCohortId type subject name location')
                    .exec((err, result) => {
                        if (err) {
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
            } else {
                var searchType = entities[index];
                entitiesModel.find({
                        type: searchType
                    })
                    .exec((err, result) => {
                        // console.log('err', err);
                        if (err) {
                            return res.status(500).send(err);
                        } else {
                            if (result.length === 0) {
                                
                                var payload = {
                                    type: entities[index],
                                    entities: []
                                }
                                
                            } else {
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
        for (var i = 0; i < entities.length; i++) {
            index++
            findEntity(i, entities, entityPackage)
        }
    },
    delete(req, res) {
        console.log('Deleting topic');
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
