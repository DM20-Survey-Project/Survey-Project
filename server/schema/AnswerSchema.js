const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  type: {
    type: String,
    lowercase: true,
    required: true,
    enum: [ 'numeric', 'boolean', 'text' ]
  },
  numericAnswer: { type: Number, min: 1 },
  booleanAnswer: { type: Boolean },
  textAnswer: { type: String }
});

module.exports = AnswerSchema;
