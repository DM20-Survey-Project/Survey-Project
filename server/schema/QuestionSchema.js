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
  lowValue: { type: Number, min: 1 },
  highValue: { type: Number, min: 1 }
});

module.exports = QuestionSchema
