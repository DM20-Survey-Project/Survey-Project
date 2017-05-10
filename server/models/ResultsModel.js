const mongoose = require('mongoose');
const AnswerSchema = require('./../schema/AnswerSchema');
const Schema = mongoose.Schema;

const ResultsSchema = new Schema({
  survey: { type: Schema.Types.ObjectId, ref: 'Surveys' },
  user: { type: Schema.Types.ObjectId, ref: 'Users' },
  answers: [AnswerSchema],
  topic: { type: String, ref: 'Topics' },
  archived: { type: Boolean, default: false }
});

module.exports = mongoose.model('Results', ResultsSchema);
