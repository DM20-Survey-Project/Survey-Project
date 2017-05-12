const mongoose = require('mongoose');
const QuestionSchema = require('./../schema/QuestionSchema');
const Schema = mongoose.Schema;

const TemplatesSchema = new Schema({
  title: { type: String, required: true },
  questions: [QuestionSchema]
});

module.exports = mongoose.model('Templates', TemplatesSchema);
