const passport = require('passport');
const mongoose = require('mongoose');
const Devmtn = require('devmtn-auth');
const config = require('../config');
const DevmtnStrategy = Devmtn.Strategy;
const User = require('../models/UserModel');
const Cohort = require('../models/CohortModel');

//////// Set up passport using devmtn login strategy ////////
passport.use('devmtn', new DevmtnStrategy({
    app: config.AUTH_CONFIG.app,
    client_token: config.AUTH_CONFIG.client_token,
    callbackURL: config.AUTH_CONFIG.callbackURL,
    jwtSecret: config.AUTH_CONFIG.jwtSecret
}, function(jwtoken, user, done) {
    console.log("DEV USER: ", user);
//////// If user does not have a cohort auto assign cohort 0 ////////
    if (!user.cohortId) {
        user.cohortId = 0;
    }

//////// Check the cohort collection for the corresponding ID to ensure the cohort exists ////////
    Cohort.findOne({ dmCohortId: user.cohortId })
        .exec(function(findCohortErr, findCohortResult) {
        if (findCohortErr) {
            return done(findCohortErr);
        } else if (!findCohortResult) {
//////// If no cohort exists build a new one ////////
            console.log('creating new cohort for id ', user.cohortId);
            var newCohort = {
                dmCohortId: user.cohortId,
            };
            Cohort.create(newCohort, function(createCohortErr, createdCohort) {
                if (createCohortErr) {
                    done(createCohortErr);
                } else {
                    finishLoginFunction(jwtoken, user, done, createdCohort._id);
                }
            });
        } else {
            console.log('cohort exists');
            finishLoginFunction(jwtoken, user, done, user.cohortId);
        }
    });


}));

var finishLoginFunction = function(jwtoken, user, done, newId) {
//////// Find user by email ////////
    User.findOne({
        email: user.email
    }, function(findErr, foundUser) {
        console.log("Here is the user being passed from the User Collection in our db " + foundUser)
        if (findErr) return done(findErr, false);

//////// If we cant find a user, create a new one ////////
        if (!foundUser) {
            var newUser = {
                name: {
                    first: user.first_name,
                    last: user.last_name
                },
                email: user.email,
                dm_id: user.id.toString(),
                roles: user.roles,
                cohortId: newId
            };
            User.create(newUser, function(createErr, createdUser) {
                if (createErr) return done(createErr, null);
                console.log("Welcome to our new user, ", createdUser);
                return done(null, createdUser);
            });
        } else {
//////// If a user was found, welcome back with their name and
            console.log('Welcome back, ' + foundUser.name.first + ' ' + foundUser.name.last);
            console.log('USER DATA: ', user);
            foundUser.dm_id = user.id.toString();
            // Put this in an if statement so that our register page does not get overwritten
            // every time an unknown user logs in.
            if (user.roles && user.roles.length > 0) {
                console.log('Overwritting roles');
                foundUser.roles = user.roles;
            } else if (user.cohortId) {
                foundUser.roles = [{ id: 6, role: 'student' }];
            }
            // //also update cohort (* if the system has one)
            // Commenting out until it gets updated appropriately.
            if (user.cohortId) {
                foundUser.cohort = user.cohortId;
            }

            //update roles from devmtn
            User.findByIdAndUpdate(foundUser._id, foundUser, function(updErr, updRes) {
                if (updErr) {
                    console.error('Error updating the user roles: ', updErr);
                    return done(null, foundUser);
                } else {
                    console.log('Successfully updated user roles: ', updRes);
                    //Make sure the id's still match up
                    return done(null, foundUser);
                }
            });
        }
    });
}

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

var hasCustomRole = function(role, user) {
    for (var i = 0; i < user.roles.length; i++) {
        if (user.roles[i].role === role) {
            return true;
        }
    }
    return false;
};

module.exports = {

//////// Logout, back to login page ////////
    logout: function(req, res) {
        req.logout();
        res.redirect('/#!/');
    },
//////// Login success take them to their user page ////////
    loginSuccessRouter: function(req, res) {
        console.log("Login Success");
        console.log('The User: ', req.user);

//////// Check a users roles and redirect them to the proper page ////////
        if (req.user.roles) {
            if (req.user.roles.length === 0) {
                console.log("WARNING: This person has NO roles: ", req.user.roles.length);
                res.redirect('/#/norole');
            }
            console.log("This person has roles: ", req.user.roles.length);
            if (Devmtn.checkRoles(req.user, 'admin')) {
                console.log("This person is an admin, redirecting to admin page.");
                res.redirect('/#!/admin');
            } else if (Devmtn.checkRoles(req.user, 'student') || hasCustomRole('student', req.user)) {
                console.log("This person is a student, redirecting to student page.")
                res.redirect('/#!/user');
            } else if (Devmtn.checkRoles(req.user, 'mentor')) {
                console.log("This person is a mentor, redirecting to student page.")
                res.redirect('/#!/user/' + req.user._id);
            } else {
                // Do something here to let them know they have no user role
            }
        }
    },

//////// Get the current user if authenticated ////////
    currentUser: function(req, res) {
        console.log('CURRENT USER: ', req.user);
        //Return the currently logged in user
        if (req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.status(401).send(null);
        }
    },
//////// Require a role of "Admin" ////////
    requireAdminRole: function(req, res, next) {
        console.log(req.user);
        //only call next if the user has admin status
        if (req.isAuthenticated() && req.user.isAdmin) {
            next();
        } else {
            res.status(401).json('Resource available for admins only');
        }
    }
};
