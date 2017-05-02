var express          = require('express')
  , session          = require('express-session')
  , port             = 8000
  , bodyParser       = require('body-parser')
  , passport         = require('passport')
  , Devmtn           = require('devmtn-auth')
  , DevmtnStrategy   = Devmtn.Strategy
  , devmtnAuthConfig = require('./devmtnAuthConfig.js')
  , app              = express()
  , morgan           = require('morgan')
// Morgan is not required, but nice for development
app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(session({
  secret: 'thisisasecret'
, resave: true
, saveUninitialized: false
}))

app.use(express.static(__dirname + '/public'))

// passport setup
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function (user, done) {
// This should match your data (e.g. user._id for mongo/mongoose)
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      return done(err)
    }
    return done(null, user)
  })
})

passport.use('devmtn', new DevmtnStrategy(devmtnAuthConfig, function (jwtoken, user, done) {
// Find or create a user in your database here, and return your user.
// json web token is also provided here, as jwtoken, and could be added to
// the session for use on API calls to devmountain.com.
  User.findOrCreate({email: user.email}, function (err, local_user) {
    return done(err, local_user)
  })
}))

// auth endpoints
app.get('/auth/devmtn', passport.authenticate('devmtn'), function (req, res) {
// redirects, so this doesn't get called
})

// failureRedirect and res.redirect should be changed to match your app
app.get('/auth/devmtn/callback', passport.authenticate('devmtn', {failureRedirect: '/#/login'}),
  function (req, res) {
// successful authentication
    console.log(req.user) // req.user is created by passport from the decoded json web token
    console.log('user roles:', req.user.roles)
    console.log('student:', Devmtn.checkRoles(req.user, 'student')) // example of checking user roles
    res.redirect('/#/dashboard')
})

app.get('/auth/devmtn/logout', function (req, res) {
  req.logout()
  console.log(req.user) // showing req.user is undefined after logout
  res.redirect('/#/')
})

// Start server
app.listen(port, function () {
  console.log('listening on port ' + port)
})

