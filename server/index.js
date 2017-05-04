///////// NPM MODULES //////////
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const devmtnAuth = require('devmtn-auth');
////// Config file ///////
const config = require('./config');

//////// CONTROLLERS /////////
const AdminSurveyCtrl = require('./controllers/AdminSurveyCtrl');
const StudentSurveyCtrl = require('./controllers/StudentSurveyCtrl');
const TemplatesCtrl = require('./controllers/TemplatesCtrl');
const TopicsCtrl = require('./controllers/TopicsCtrl');
const UserCtrl = require('./controllers/UserCtrl')



///// Express /////
const app = module.exports = express();
app.use(express.static('./public'));
app.use(bodyParser.json());
///// Session and Passport ///////
app.use(session({
    secret: config.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
}));
app.use(passport.initialize());
app.use(passport.session());


/////////// PASSPORT ////////////
passport.use('devmtn', new devmtnAuth({
        app: config.AUTH_CONFIG.app,
        client_token: config.AUTH_CONFIG.client_token,
        callbackURL: config.AUTH_CONFIG.callbackURL,
        jwtSecret: config.AUTH_CONFIG.jwtSecret
    },
    function(jwtoken, user, done) {
      console.log("DEV USER: ", user);
      if (!user.cohort) {
        // Add cohort 0 for people who do not have a cohort id
        user.cohort = 0;
        console.log('this user does not have a cohort id');
      }
      //Make sure we have that id in our database
      Cohort.findOne({ dmCohortId: user.cohort }).exec(function (findCohortErr, findCohortResult) {
        if (findCohortErr) {
          return done(findCohortErr);
        } else if (!findCohortResult) {
          //We Need to make the cohort first!
          console.log('creating new cohort for id ', user.cohort);
          var newCohort = {
            dmCohortId: user.cohort,
          };
          Cohort.create(newCohort, function (createCohortErr, createdCohort) {
            if (createCohortErr) {
              done(createCohortErr);
            } else {
              finishLoginFunction(jwtoken, user, done, createdCohort._id);
            }
          });
        } else {
          console.log('cohort exists');
          finishLoginFunction(jwtoken, user, done, user.cohort);
        }
      });
    }));
    var finishLoginFunction = function (jwtoken, user, done, newId) {
      User.findOne({ email: user.email }, function (findErr, foundUser) {
        console.log("Here is the user being passed from the User Collection in our db " + foundUser)
        if (findErr) return done(findErr, false);
        // If we can't find a user in our db then create one
        if (!foundUser) {
          var newUser = {
            name: {
              first: user.first_name,
              last: user.last_name
            },
            email: user.email,
            dm_id: user.id.toString(),
            roles: user.roles,
            cohort: newId
          };
          User.create(newUser, function (createErr, createdUser) {
            if (createErr) return done(createErr, null);
            console.log("Welcome to our new user, ", createdUser);
            return done(null, createdUser);
          });
        } else {
          //Existing user found in my database
          console.log('Welcome back, ' + foundUser.name.first + ' ' + foundUser.name.last);
          console.log('USER DATA: ', user);
          foundUser.dm_id = user.id.toString();
          // Put this in an if statement so that our register page does not get overwritten
          // every time an unknown user logs in.
          if (user.roles && user.roles.length > 0) {
            console.log('Overwritting roles');
            foundUser.roles = user.roles;
          }else if(user.cohort){
            foundUser.roles  = [{id:6, role:'student'}];
          }
          // //also update cohort (* if the system has one)
          // Commenting out until it gets updated appropriately.
          if (user.cohort) {
            foundUser.cohort = user.cohort;
          }
          //update roles from devmtn
          User.findByIdAndUpdate(foundUser._id, foundUser, function (updErr, updRes) {
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
    passport.serializeUser(function (user, done) {
      done(null, user);
    });
    passport.deserializeUser(function (obj, done) {
      done(null, obj);
    });
    var hasCustomRole = function (role, user) {
      for (var i = 0; i < user.roles.length; i++) {
        if (user.roles[i].role === role) {
          return true;
        }
      }
      return false;
    };
    module.exports = {
      logout: function (req, res) {
        req.logout();
        res.redirect('/#/');
      },
      loginSuccessRouter: function (req, res) {
        console.log("Login Success");
        console.log('The User: ', req.user);
        //This is where we are sending users to the appropriate place in our app depending on their roles
        if (req.user.roles) {
          if(req.user.roles.length === 0){
            console.log("WARNING: This person has NO roles: ", req.user.roles.length);
            res.redirect('/#/norole');
          }
          console.log("This person has roles: ", req.user.roles.length);
          if (Devmtn.checkRoles(req.user, 'admin')) {
            console.log("This person is an admin, redirecting to admin page.");
            res.redirect('/#/admin');
          } else if (Devmtn.checkRoles(req.user, 'student') || hasCustomRole('student', req.user)) {
            console.log("This person is a student, redirecting to student page.")
            res.redirect('/#/student/' + req.user._id);
          } else if (Devmtn.checkRoles(req.user, 'mentor')) {
            console.log("This person is a mentor, redirecting to student page.")
            res.redirect('/#/student/' + req.user._id);
          }  else {
            // Do something here to let them know they have no user role
          }
        }
      },
      currentUser: function (req, res) {
        console.log('CURRENT USER: ', req.user);
        //Return the currently logged in user
        if (req.isAuthenticated()) {
          res.json(req.user);
        } else {
          res.status(401).send(null);
        }
      },
      requireAdminRole: function (req, res, next) {
        console.log(req.user);
        //only call next if the user has admin status
        if (req.isAuthenticated() && req.user.isAdmin) {
          next();
        } else {
          res.status(401).json('Resource available for admins only');
        }
      }
    };







///////// Student Endpoints //////////
app.get('/api/surveys/untaken/:student_id', StudentSurveyCtrl.readUntaken);
app.get('/api/surveys/:id', StudentSurveyCtrl.read);
app.post('/api/surveys/results', StudentSurveyCtrl.create);

///////// Admin Endpoints //////////
app.get('/api/admin/surveys', AdminSurveyCtrl.read);
app.get('/api/admin/surveys/names-dates', AdminSurveyCtrl.readNamesAndDates);
app.get('/api/admin/surveys/:id', AdminSurveyCtrl.readOne);
app.get('/api/admin/results/:id', AdminSurveyCtrl.readResults);
app.get('/api/admin/surveys/sent-to/:survey_id', AdminSurveyCtrl.readSentTo);
app.get('/api/admin/surveys/untaken/:survey_id', AdminSurveyCtrl.readUntaken);
app.post('/api/admin/surveys', AdminSurveyCtrl.create);

///////// Template Endpoints //////////
app.get('/api/admin/templates', TemplatesCtrl.readNames);
app.get('/api/admin/templates/:id', TemplatesCtrl.read);
app.post('/api/admin/templates', TemplatesCtrl.create);
app.put('/api/admin/templates/:id', TemplatesCtrl.update);
app.delete('/api/admin/templates/:id', TemplatesCtrl.delete);

///////// Topics Endpoints //////////
app.get('/api/topics', TopicsCtrl.read);
app.get('/api/admin/topics', TopicsCtrl.read);
app.post('/api/admin/topics', TopicsCtrl.create);
app.delete('/api/admind/topics/:id', TopicsCtrl.delete);

///////// User Endpoints //////////
app.get('/api/admin/users', UserCtrl.read);
app.get('/api/admin/users/cohort/:cohort_id', UserCtrl.readUsersInCohort);
app.post('/api/admin/users', UserCtrl.create);
app.put('/api/admin/users/:id', UserCtrl.update);
app.delete('/api/admin/users/:id', UserCtrl.delete);









/////// CONNECTION ///////
const mongoURI = config.MONGO_URI;
const port = config.PORT;
mongoose.connect(mongoURI)
mongoose.Promise = global.Promise;
mongoose.connection.once('open', function() {
    console.log('Connected to Mongo DB at', mongoURI);
    app.listen(port, function() {
        console.log('Listening on port ' + port);
    });
});









//////////INITILIZE APP////////////////////////////////////////

/////////////MASSIVE SETUP ///////////////////////////////////

///////////CONTROLLERS//////////////////////////////////////

/////////////////////PRODUCTS ENDPOINTS//////////////////////

//////////LISTEN/////////////////////////////////////
