const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: {type: 'String', required: true},
  last_name: {type: 'String', required: true},
  cohort:  {type: 'Number', required: true},
  email: {type: 'String', required: true},
  password: {type: 'String', required: true},
  roles: [{type: 'String', required: true}]
});

module.exports = mongoose.model('User', UserSchema);
