var chai           = require('chai')
  , expect         = chai.expect
  , sinon          = require('sinon')
  , sinonChai      = require('sinon-chai')
  , passport       = require('chai-passport-strategy')
  , Devmtn         = require('../lib/index.js')
  , DevmtnStrategy = Devmtn.Strategy

chai.use(sinonChai)
chai.use(passport)

describe('DevmtnStrategy', function () {

  var strategy = new DevmtnStrategy({
    app: 'test'
  , client_token: '123'
  , callbackURL: 'http://localhost:8034/auth/devmtn/callback'
  , jwtSecret: '456'
  }, function (jwtoken, user, done) {})

  it('should be named devmtn', function () {
    expect(strategy.name).to.equal('devmtn')
  })

  it('should throw if constructed without a verify callback', function () {
    expect(function () {
      new DevmtnStrategy({
        app: 'test'
      , client_token: '123'
      , callbackURL: 'http://localhost:8034/auth/devmtn/callback'
      , jwtSecret: '456'
      })
    }).to.throw(TypeError, 'DevmtnStrategy requires a verify callback')
  })

  it('should throw if constructed without an app credential', function () {
    expect(function () {
      new DevmtnStrategy({
        client_token: '123'
      , callbackURL: 'http://localhost:8034/auth/devmtn/callback'
      , jwtSecret: '456'
      }, function () {})
    }).to.throw(TypeError, 'DevmtnStrategy requires an app credential')
  })

  it('should throw if constructed without a client_token credential', function () {
    expect(function () {
      new DevmtnStrategy({
        app: 'test'
      , callbackURL: 'http://localhost:8034/auth/devmtn/callback'
      , jwtSecret: '456'
      }, function () {})
    }).to.throw(TypeError, 'DevmtnStrategy requires a client_token credential')
  })

  it('should throw if constructed without a callbackURL', function () {
    expect(function () {
      new DevmtnStrategy({
        app: 'test'
      , client_token: '123'
      , jwtSecret: '456'
      }, function () {})
    }).to.throw(TypeError, 'DevmtnStrategy requires a callbackURL')
  })

  it('should throw if constructed without a jwtSecret', function () {
    expect(function () {
      new DevmtnStrategy({
        app: 'test'
      , client_token: '123'
      , callbackURL: 'http://localhost:8034/auth/devmtn/callback'
      }, function () {})
    }).to.throw(TypeError, 'DevmtnStrategy requires a jwtSecret')
  })

  it('should throw if constructed with only a verify callback', function () {
    expect(function () {
      new DevmtnStrategy(function () {})
    }).to.throw(TypeError, 'DevmtnStrategy requires an app credential')
  })

  describe('authenticate', function () {
    var jwtoken, testStrategy
    var options = {
      app: 'test'
    , client_token: '123'
    , callbackURL: 'http://localhost:8034/auth/devmtn/callback'
    , jwtSecret: '456'
    }
    beforeEach(function () {
      testStrategy = new DevmtnStrategy(options, function (jwtoken, user, done) {
        return done(null, user)
      })
    })

    afterEach(function () {
      jwtoken = null
    })

    describe('handling an auth request to be redirected', function () {
      var url
      beforeEach(function (done) {
        chai.passport.use(testStrategy)
          .redirect(function (u) {
            url = u
            done()
          })
          .req(function (req) {})
          .authenticate()
      })

      it('should be redirected', function () {
        var encodedCallback = encodeURIComponent('http://localhost:8034/auth/devmtn/callback')
        var expected = 'https://devmountain.com/login?bounce=test&redirect_uri=' + encodedCallback + '&client_id=123'
        expect(url).to.equal(expected)
      })
    })

    describe('handling an authorized request', function () {
      var user, info, token, _verifySpy
      beforeEach(function (done) {
        _verifySpy = sinon.spy(testStrategy, '_verify')
        var jwt = require('jsonwebtoken')
        token = jwt.sign({
          'id': 42,
        }, '456')
        var req = {
          query: {
            token: token
          }
        }
        chai.passport.use(testStrategy)
          .success(function (u, i) {
            user = u
            info = i
            done()
          })
          .req(function (req) {
            req.query = {}
            req.query.token = token
          })
          .authenticate()
      })

      afterEach(function () {
        testStrategy._verify.restore()
      })

      it('should supply a jwtoken and a user to the verify callback', function () {
        expect(_verifySpy.getCall(0).args[0]).to.equal(token)
        expect(_verifySpy.getCall(0).args[1]).to.be.an('object')
        expect(_verifySpy.getCall(0).args[1].id).to.equal(42)
      })
    })

    describe('handling an error in query string', function () {
      beforeEach(function (done) {
        chai.passport.use(testStrategy)
          .fail(function (i) {
            info = i
            done()
          })
          .req(function (req) {
            req.query = {}
            req.query.error = 'access_denied'
            req.query.error_description = 'YOU SHALL NOT PASS!'
          })
          .authenticate()
      })

      it('should fail with message', function () {
        expect(info).to.not.be.undefined
        expect(info.message).to.equal('YOU SHALL NOT PASS!')
      })

    })

  })

})

