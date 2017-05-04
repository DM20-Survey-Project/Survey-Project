///////// NPM MODULES //////////
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');

////// Config file ///////
const config = require('./config');

//////// CONTROLLERS /////////
const AdminSurveyCtrl = require('./controllers/AdminSurveyCtrl');
const StudentSurveyCtrl = require('./controllers/StudentSurveyCtrl');
const TemplatesCtrl = require('./controllers/TemplatesCtrl');
const TopicsCtrl = require('./controllers/TopicsCtrl');
const UserCtrl = require('./controllers/UserCtrl')

//////// Services //////////
const passport = require('./services/passport');


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




// ///// Policies /////
// let isAuthed = function(req, res, next) {
//   if(!req.isAuthenticated()) return res.status(401).send();
//   return next();
// };

// /////// Passport Endpoints ////////
// app.get('/api/auth', (req, res, next) => {
//   // provide a different state for callback
//   if (req.query.state) req.session.state = req.query.state;
//   passport.authenticate('devmtnAuth')(req, res, next);
// });
// app.get('/api/auth/callback', (req, res, next) => {
//   // check if user should be redirected to a specific state
//   let state = 'home';
//   if (req.session.state) state = req.session.state;
//   req.session.state = null;
//   passport.authenticate('devmtnAuth', {
//     successRedirect: `/#!/${state}`,
//     failureRedirect: `/#!/`
//   })(req, res, next);
// });
//
// app.get('/api/logout', function(req, res, next) {
//   req.logout();
//   res.status(200).send('logged out');
// });




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


/////// CONNECTION ///////
const mongoURI = config.MONGO_URI;
const port = config.PORT;
mongoose.connect(mongoURI)
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
