///////// NPM MODULES //////////
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const devmtnAuth = require('devmtn-auth');

////// Config file ///////
const config = require('./config');

//////// Controllers /////////
const UserCtrl = require('./controllers/UserCtrl');

//////// Services //////////
const passport = require('./services/passport');

///// Policies /////
let isAuthed = function(req, res, next) {
  if(!req.isAuthenticated()) return res.status(401).send();
  return next();
};

///// Express /////
const app = express();

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


////// FROM SANE APP / Fix conflicts /////////
// passport.use(new devmtnAuth(config.AUTH_CONFIG, function(accessToken, refreshToken, extraParams, profile, done) {
//     db.user.email([profile.displayName], function(err, user) {
//         if (err) {
//             return done(err);
//         } else if (!user.length) {
//             db.user.create([profile.nickname, profile.displayName], function(err, user) {
//                 if (err) {
//                     return done(err);
//                 }
//                 console.log('User created');
//
//                 db.order.insert([user[0].user_id], function(err, order) {
//                     if (err) {
//                         console.log('DB Create, durring user create: ', err);
//                     }
//
//                     user[0].order_id = order[0].order_id;
//                     return done(null, user[0]);
//                 })
//             })
//         } else {
//             console.log('User found');
//             db.order.read_incomplete([user[0].user_id], function(err, order) {
//                 if (err) {
//                     return console.log("Find User Auth, Order not found", err);
//                 }
//
//                 console.log('order: ', order);
//                 user[0].order_id = order[0].order_id;
//                 return done(null, user[0]);
//             });
//         }
//     });
//
// }));
//
// passport.serializeUser(function(user, done) {
//     done(null, user);
// });
// passport.deserializeUser(function(user, done) {
//     done(null, user);
// });



/////// Passport Endpoints ////////
app.post('/login', passport.authenticate('local', {
  successRedirect: '/me'
}));
app.get('/logout', function(req, res, next) {
  req.logout();
  return res.status(200).send('logged out');
});

/////// User Endpoints ///////
app.post('/register', UserCtrl.register);
app.get('/user', UserCtrl.read);
app.get('/me', isAuthed, UserCtrl.me);
app.put('/user/:_id', isAuthed, UserCtrl.update);

/////// CONNECTIONS ///////
const mongoURI = config.MONGO_URI;
const port = config.PORT;

mongoose.connect(mongoURI);
mongoose.connection.once('open', function() {
  console.log('Connected to Mongo DB at', mongoURI);
  app.listen(port, function() {
    console.log('Listening on port' + port);
  });
});



























//////////INITILIZE APP////////////////////////////////////////

/////////////MASSIVE SETUP ///////////////////////////////////

///////////CONTROLLERS//////////////////////////////////////

/////////////////////PRODUCTS ENDPOINTS//////////////////////

//////////LISTEN/////////////////////////////////////
