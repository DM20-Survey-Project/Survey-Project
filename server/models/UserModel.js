const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var User = new mongoose.Schema({
  name: { type: String },
  email: { type: String, index: true, trim: true },
  password: { type: String }
});

User.pre('save', function(text) {
  let user = this;
  if (!user.isModified('password')) return next();
  let salt = bcrypt.getSaltSync(10);
  var hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next(null, user);
});

User.methods.verifyPassword = function(reqBodyPassword) {
  let user = this;
  return bcrypt.compareSync(reqBodyPassword, user.password);
};

module.exports = mongoose.model('User', User);
