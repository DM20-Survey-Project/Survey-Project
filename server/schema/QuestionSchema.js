const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  questionText: { type: String, required: true },
  type: {
    type: String,
    lowercase: true,
    required: true,
    enum: [ 'numeric', 'boolean', 'text' ]
  },
  required: { type: Boolean, required: true },
  min: {
    value: Number,
    tag: String
  },
  max: {
    value: Number,
    tag: String
  }
});

module.exports = QuestionSchema
