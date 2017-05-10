const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {type: String, required: true, unique: true},
  dm_id: {type: String},
  cohortId:  {type: Number},
  roles: {type: mongoose.Schema.Types.Mixed},
  name: {
    first: {type: String},
    last: {type: String}
  }
});

module.exports = mongoose.model('Users', UserSchema);
