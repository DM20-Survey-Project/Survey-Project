const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TopicsSchema = new Schema({
  name: { type: String, required: true }
});

module.exports = mongoose.model('Topics', TopicsSchema);
