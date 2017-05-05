///////// NPM MODULES //////////
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const devmtnAuth = require('devmtn-auth');
const passport = require('passport')
////// Config file ///////
const config = require('./config');
////// Config file ///////
const authMiddleware = require('./authMiddleware');

//////// CONTROLLERS /////////
const AdminSurveyCtrl = require('./controllers/AdminSurveyCtrl');
const StudentSurveyCtrl = require('./controllers/StudentSurveyCtrl');
const TemplatesCtrl = require('./controllers/TemplatesCtrl');
const TopicsCtrl = require('./controllers/TopicsCtrl');
const UserCtrl = require('./controllers/UserCtrl')
const devmtnCtrl = require('./controllers/DevMtnAuthCtrl');
const authCtrl = require('./controllers/AuthCtrl');

require('./controllers/LocalLogin')(passport);

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



// app.use(authMiddleware.validateQueryToken);
// ///////// Auth Endpoints //////////
// app.get('/auth/devmtn', passport.authenticate('devmtn'));
// app.get('/auth/devmtn/callback', passport.authenticate('devmtn', { failureRedirect: '/#/' }), devmtnCtrl.loginSuccessRouter);
// app.get('/api/logout', authCtrl.logout);
//
// function optionalCookieCheck(req, res, next) {
//     if (req && req.cookies && req.cookies['jwtAuth']) {
//         return passport.authenticate('jwt');
//     } else {
//         next();
//     }
// }
// app.get('/api/current_user', authCtrl.current_user);
// app.get('/api/current_admin_user', authCtrl.current_admin_user);
// app.get('/api/admin/templates', authCtrl.requireAdminAuth, TemplatesCtrl.readNames)

// Auth
app.post('/api/login', passport.authenticate('local-login'), authCtrl.successResponse);

// Auth
app.post('/api/signup', authCtrl.localSignup);

app.get('/api/logout', authCtrl.logout);

app.get('/api/current_user', authCtrl.current_user);

app.get('/api/current_admin_user', authCtrl.current_admin_user);



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
