const mongoose = require('mongoose');
const QuestionSchema = require('./../schema/QuestionSchema');
const Schema = mongoose.Schema;

const TemplatesSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  questions: [QuestionSchema]
});

module.exports = mongoose.model('Templates', TemplatesSchema);
