// PASSPORT //
const passport = require('passport');
const devmtnAuth = require('devmtn-auth');

// CONFIG //
const config = require('./../config');

// MODEL AND DB CONNECTIONS //
const User = require('./../models/UserModel');

// RUN WHEN LOGGING IN //
passport.use(new devmtnAuth(config.AUTH_CONFIG, (accessToken, refreshToken, extraParams, profile, done) => {

  User.find({ email: profile.emails[0].value }, (err, result) => {
    let user = result[0];
    // If DB error
    if (err) { return done(err); }
    // If user doesn't exist in DB
    else if (!user) {
      // Check for auth0 givenName, if it doesn't exist then default to auth0 displayName
      if (!profile.name.givenName)
        profile.name = {
          givenName: profile.displayName,
          familyName: null
        };
      // Create user.
      User.create({
        firstname: profile.name.givenName,
        lastname: profile.name.familyName,
        email: profile.emails[0].value,
        phone: null,
        auth0id: profile.id
      }, (err, result) => {
        if (err) return done(err);
        return done(null, result);
      });
    }
    // Can and does the username need to be updated?
    else if (!user.lastname && profile.name.familyName) {
      // Change name
      user.firstname = profile.name.givenName;
      user.lastname = profile.name.familyName;
      // Update user
      User.findOneAndUpdate({email: profile.emails[0].value}, user, (err, result) => {
        if (err) {
          console.err('User update error on login', err);
          return done(err);
        }
        return done(null, user);
      });
    }
    // User exists and no changes need to be made.
    else {
      return done(null, user);
    }
  });
}));

// Puts the user on the session
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = passport;
