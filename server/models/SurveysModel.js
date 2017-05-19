const mongoose = require('mongoose');
const QuestionSchema = require('./../schema/QuestionSchema');
const Schema = mongoose.Schema;

const SurveySchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  cohortSentTo: { type: Number, required: true },
  usersSentTo: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  usersUntaken: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  dateSent: { type: String, required: true },
  entities: { },
  questions: [QuestionSchema],
  results: [],
  templateId: { type: Schema.Types.ObjectId, ref: 'Templates' }
});

module.exports = mongoose.model('Surveys', SurveySchema);
