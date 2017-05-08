var strategy = require('..')
  , chai     = require('chai')
  , expect   = chai.expect

describe('Module: devmtn-auth', function () {
  it('should export Strategy constructor directly from package', function () {
    expect(strategy).to.be.a('function')
    expect(strategy).to.equal(strategy.Strategy)
  })

  it('should export checkRoles method', function () {
    expect(strategy.checkRoles).to.be.a('function')
  })

})

