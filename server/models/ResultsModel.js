const mongoose = require('mongoose');
const AnswerSchema = require('./../schema/AnswerSchema');
const Schema = mongoose.Schema;

const ResultsSchema = new Schema({
  results: [AnswerSchema]
});

module.exports = mongoose.model('Results', ResultsSchema);
