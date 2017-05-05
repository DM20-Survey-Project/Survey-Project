var localStrategy = require('passport-local').Strategy,
    user = require('../models/UserModel');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        console.log("user = ", user);
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        console.log("id = ", id);
        user.findById(id, function(err, user) {
            done(err, user);
        });
    });


    // LOCAL AUTH

    passport.use('local-login', new localStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

          // find a user whose email is the same as the forms email
          // we are checking to see if the user trying to login already exists
          user.findOne({ 'email' :  email }, function(err, user) {
              // if there are any errors, return the error
              if (err) return done(err);

              // check to see if theres already a user with that email
              if (user) {
                // if (user.validPassword(password)) {
                    return done(null, user);
                // } else {
                //     return done('Invalid Password', false);
                // }
              } else {
                  // if there is no user with that email
                  return done('User not found', false);
              }

          });

        });

    }));


}
