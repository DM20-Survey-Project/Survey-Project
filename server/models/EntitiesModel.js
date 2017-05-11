const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EntitiesSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, lowercase: true, required: true },
  location: {
      city: { type: String },
      state: { type: String },
      required: false
  }
})

module.exports = mongoose.model('Entities', EntitiesSchema);
