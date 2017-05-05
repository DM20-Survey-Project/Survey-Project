const mongoose = require('mongoose');
const QuestionSchema = require('./../schema/QuestionSchema');
const Schema = mongoose.Schema;

const SurveySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  cohortSentTo: { type: Number, required: true },
  usersSentTo: [{ type: String, ref: 'Users' }],
  usersTaken: [{ type: String, ref: 'Users' }],
  dateSent: { type: Date, required: true },
  topic: { type: String, ref: 'Topics' },
  questions: [QuestionSchema]
});

module.exports = mongoose.model('Surveys', SurveySchema);
