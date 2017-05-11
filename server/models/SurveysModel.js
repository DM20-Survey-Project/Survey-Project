const mongoose = require('mongoose');
const QuestionSchema = require('./../schema/QuestionSchema');
const ResultsSchema = require('./../models/ResultsModel');
const Schema = mongoose.Schema;

const SurveySchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  cohortSentTo: { type: Number, required: true },
  usersSentTo: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  usersUntaken: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  dateSent: { type: Date, required: false },
  topic: { type: String },
  entities: {

  },
  questions: [QuestionSchema],
  results: []
});

module.exports = mongoose.model('Surveys', SurveySchema);
