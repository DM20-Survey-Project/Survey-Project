/* This module authenticates via an OAuth-like strategy, with credentials that are
 * the app name and a client token (provided by DevMountain), a callbackURL, and
 * the json web token secret. It will redirect to devmountain.com for user login, which
 * will return a json web token to the callback. To verify the token is valid on the
 * app's server, the app must also have the json web token secret (also provided by
 * DevMountain).
 */

var inherits = require('inherits')
  , Strategy = require('passport-strategy')
  , OAuth2   = require('oauth').OAuth2

function DevmtnStrategy (options, verify) {
  if (typeof options == 'function') {
    verify = options
    options = undefined
  }
  options = options || {}

  if (!options.app) {
    throw new TypeError('DevmtnStrategy requires an app credential')
  }
  if (!options.client_token) {
    throw new TypeError('DevmtnStrategy requires a client_token credential')
  }
  if (!options.callbackURL) {
    throw new TypeError('DevmtnStrategy requires a callbackURL')
  }
  if (!options.jwtSecret) {
    throw new TypeError('DevmtnStrategy requires a jwtSecret')
  }
  if (typeof verify !== 'function' || !verify) {
    throw new TypeError('DevmtnStrategy requires a verify callback')
  }

  Strategy.call(this)
  this.name = 'devmtn',
  this._app = options.app
  this._redirect_uri = options.callbackURL
  this._jwtSecret = options.jwtSecret
  this._verify = verify
  this._passReqToCallback = options.passReqToCallback
  this._authorizationURL = 'https://devmountain.com/login'
  this._oauth2 = new OAuth2(options.client_token, '', '', this._authorizationURL, '', '')
}

inherits(DevmtnStrategy, Strategy)

DevmtnStrategy.prototype.authenticate = function (req, options, next) {
  options = options || {}
  var user = {}
    , self = this

  if (req.query && req.query.error) {
    return this.fail({message: req.query.error_description})
  }

  if (req.query && req.query.token) {
    var jwt     = require('jsonwebtoken')
      , jwtoken = req.query.token;

      if (req.query && !req.query.token && req._parsedUrl && req._parsedUrl.query && req._parsedUrl.query.slice(0,6) == "token="){
        // console.log("req url", req._parsedUrl);
        // in case the req.query token is missing... stupid feathers breaking it :/

        req.query.token = req._parsedUrl.query.slice(6);
      }
    // verify secret and check expiration
    jwt.verify(jwtoken, this._jwtSecret, function (err, decoded) {
      if (err) {
        if (req.session.decoded) {
          delete req.session.decoded
        }
        return self.fail({message: 'jwtoken secret does not match.'})
      } else {
        // token is valid, update decoded
        user = decoded
        user._json = {}; //To work with feathers Auth API, for some reason it thinks this should exist.
        function verified (err, user, info) {
          if (err) {
            return self.error(err)
          }
          if (!user) {
            return self.fail(info)
          }

          return self.success(user, info)
        }
        try {
          if (self._passReqToCallback) {
            var arity = self._verify.length
            if (arity == 5) {
              self._verify(req, jwtoken, params, user, verified)
            } else { // arity == 4
              self._verify(req, jwtoken, user, verified)
            }
          } else {
            var arity = self._verify.length
            if (arity == 4) {
              self._verify(jwtoken, params, user, verified)
            } else { // arity == 3
              self._verify(jwtoken, user, verified)
            }
          }
        } catch (ex) {
          return self.error(ex)
        }
      }
    })
  } else {
    var params = {}
    params['bounce'] = this._app
    params['redirect_uri'] = this._redirect_uri
    var location = this._oauth2.getAuthorizeUrl(params)
    this.redirect(location)
  }
}

DevmtnStrategy.checkRoles = function (user, checkRole) {
  hasRole = false
  if (!user.roles) return false
  user.roles.forEach(function (role) {
    if (role.role === checkRole) {
      hasRole = true
    }
  })
  return hasRole
}

module.exports = DevmtnStrategy
