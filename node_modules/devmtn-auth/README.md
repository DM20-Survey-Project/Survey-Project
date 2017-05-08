# DevMountain Auth
## With Passport & JSON Web Tokens

This module is a Passport strategy to allow for DevMountain microservice authentication with
relatively little configuration. You get all the normal benefits of Passport, including auth
redirect/callback, req.user and req.logout, and serializing the user onto the session. Successful
authentication will provide a user object with email, user roles, and the unique id from the
authentication server database. If your app needs different/more information, it must be
configured on DevMountain's app.

Example/recommended server setup [here](./example/server.js).

Testing: `npm test`.

## Usage

* Install devmtn-auth: `npm i -S devmtn-auth`
* Add `devmtnAuthConfig.js` to your `.gitignore`
* `touch` a `devmtnAuthConfig.js` and set it up like this (you provide specific values):

    module.exports = {
      app          : 'app-name'
    , client_token : 'client-token'
    , callbackURL  : 'callbackURL'
    , jwtSecret    : 'jwtSecret'
    }

That's it for setup! However, for this to work, your app must be configured on the authentication
server, and you must be given appropriate configuration values.

--------

The token can be accessed in the verification callback when you set up the strategy.

    passport.use('devmtn', new DevmtnStrategy(devmtnAuthConfig, function(jwtoken, user, done){
      // could attach the token to the session for use against DevMountain APIs
      req.session.jwtoken = jwtoken
      User.findOrCreate({email: user.email}, function(err, local_user){
        return done(err, local_user)
      })
    }))

--------

For convenience, devmtn-auth exposes a `checkRoles` function that can be used to verify user
roles from the decoded JSON web token.

    var Devmtn = require('devmtn-auth')
    Devmtn.checkRoles(req.user, 'student')
    // returns bool

