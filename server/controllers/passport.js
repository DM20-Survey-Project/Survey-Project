const localStrategy = require('passport-local').Strategy;
const user = require('../models/UserModel');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        console.log("user = ", user);
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        console.log("id = ", id);
        user.findById(id, function(err, user) {
            done(err, user);
        });
    });
}
