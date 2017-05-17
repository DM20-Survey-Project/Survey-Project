///////// NPM MODULES //////////
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const devmtnAuth = require('devmtn-auth');
const passport = require('passport')
////// Config file ///////
const config = require('./config');
////// Auth Middleware file ///////
const authMiddleware = require('./authMiddleware');

//////// CONTROLLERS /////////
const adminSurveyCtrl = require('./controllers/AdminSurveyCtrl');
const studentSurveyCtrl = require('./controllers/StudentSurveyCtrl');
const templatesCtrl = require('./controllers/TemplatesCtrl');
const topicsCtrl = require('./controllers/TopicsCtrl');
const userCtrl = require('./controllers/UserCtrl')
const devmtnCtrl = require('./controllers/DevMtnAuthCtrl');
const authCtrl = require('./controllers/AuthCtrl');
const jwtAuthCtrl = require('./controllers/jwtAuthCtrl');
const cohortCtrl = require('./controllers/CohortCtrl');
const entitiesCtrl = require('./controllers/EntitiesCtrl');
jwt = require
require('./controllers/passport')(passport);

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


app.use(authMiddleware.validateQueryToken);
///////// Auth Endpoints //////////
app.get('/auth/devmtn', passport.authenticate('devmtn'));
app.get('/auth/devmtn/callback', passport.authenticate('devmtn', { failureRedirect: '/#/' }), devmtnCtrl.loginSuccessRouter);
app.get('/api/logout', authCtrl.logout);

function optionalCookieCheck(req, res, next) {
    if (req && req.cookies && req.cookies['jwtAuth']) {
        return passport.authenticate('jwt');
    } else {
        next();
    }
}
app.get('/api/current_user', authCtrl.current_user);
app.get('/api/current_admin_user', authCtrl.current_admin_user);






///////// Student Endpoints //////////
app.get('/api/surveys/untaken/:student_id', authCtrl.requireAuth, studentSurveyCtrl.readUntaken);
app.get('/api/surveys/:id', authCtrl.requireAuth, studentSurveyCtrl.read);
app.post('/api/surveys/results', authCtrl.requireAuth, studentSurveyCtrl.create);

///////// Admin Endpoints //////////
app.get('/api/admin/surveys', adminSurveyCtrl.read);
app.get('/api/admin/results', authCtrl.requireLeadAuth, adminSurveyCtrl.queryResults);
app.get('/api/admin/surveys/names-dates', authCtrl.requireAdminAuth, adminSurveyCtrl.readNamesAndDates);
app.get('/api/admin/surveys/:id', authCtrl.requireAdminAuth, adminSurveyCtrl.readOne);
app.get('/api/admin/results/:id', authCtrl.requireLeadAuth, adminSurveyCtrl.readResults);
app.get('/api/admin/results/analytics/:id', authCtrl.requireLeadAuth, adminSurveyCtrl.readAnalyticsResults)
app.get('/api/admin/surveys/sent-to/:survey_id', authCtrl.requireAdminAuth, adminSurveyCtrl.readSentTo);
app.get('/api/admin/surveys/untaken/:survey_id', authCtrl.requireAdminAuth, adminSurveyCtrl.readUntaken);
app.get('/api/admin/surveyfilter', adminSurveyCtrl.readFilterOptions);
app.post('/api/admin/surveys', adminSurveyCtrl.create);

///////// Template Endpoints //////////
app.get('/api/admin/templates', templatesCtrl.readNames);
app.get('/api/admin/templates/:id', templatesCtrl.read);
app.put('/api/admin/templates', templatesCtrl.createOrUpdate);
// app.put('/api/admin/templates/:id', templatesCtrl.update);
app.delete('/api/admin/templates/:id', authCtrl.requireAdminAuth, templatesCtrl.delete);

///////// Topics Endpoints //////////
app.get('/api/topics/:id', topicsCtrl.read);
app.post('/api/topics', topicsCtrl.create);
app.get('/api/admin/topics', authCtrl.requireAdminAuth, topicsCtrl.read);
app.post('/api/admin/topics', authCtrl.requireAdminAuth, topicsCtrl.create);
app.delete('/api/admind/topics/:id', authCtrl.requireAdminAuth, topicsCtrl.delete);

///////// User Endpoints //////////
app.get('/api/admin/users',  userCtrl.read);
app.get('/api/admin/users/cohort/:cohort_id', authCtrl.requireAdminAuth, userCtrl.readUsersInCohort);
app.post('/api/admin/users', userCtrl.create);
app.put('/api/admin/users/:id', authCtrl.requireAdminAuth, userCtrl.update);
app.delete('/api/admin/users/:id', authCtrl.requireAdminAuth, userCtrl.delete);

///////// Cohort Endpoints //////////
app.get('/api/admin/cohorts', authCtrl.requireAdminAuth, cohortCtrl.read);
app.put('/api/admin/cohorts/:id', authCtrl.requireAdminAuth, cohortCtrl.update);
app.get('/api/admin/checkDevMountainCohorts', cohortCtrl.checkDevMountain);


///////// Entities Endpoints //////////
app.post('/api/entities', entitiesCtrl.readByType);
app.delete('/api/entities/:id', entitiesCtrl.delete);
app.post('/api/addentity', entitiesCtrl.create);





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
