const JwtStrategy = require('passport-jwt').Strategy;
const passport = require('passport');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/UserModel');
const DevmtnAuthConfig = require('../config').AUTH_CONFIG;

var opts = {}
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = DevmtnAuthConfig.jwtSecret;
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log("jwt strategy initialized",jwt_payload);
    User.findOne({dm_id: jwt_payload.id}, function(err, user) {
        console.log("jwt user found: ", user);
        if (err) {
           return done(err, false);
        }
        if (user) {
            console.log("jwt strategy success");
            done(null, user);
        } else {
            done(null, false);
        }
    });
}));

function cookieExtractor(req) {
    var token = null;
    token = req.cookies['jwtAuth'];
    return token;
};
