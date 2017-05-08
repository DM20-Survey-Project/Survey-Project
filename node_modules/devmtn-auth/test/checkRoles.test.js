var chai   = require('chai')
  , expect = chai.expect
  , Devmtn = require('../lib/index.js')

describe('Devmtn.checkRoles', function () {
  var user = {
    email: 'test@test.com'
  , id: 5
  , roles: [{
      role: 'tester'
    , id: 1
    }, {
      role: 'clockmaker'
    , id: 3
    }]
  }

  it('should return true if role exists', function () {
    expect(Devmtn.checkRoles(user, 'tester')).to.equal(true)
  })

  it('should return false if role does not exist', function () {
    expect(Devmtn.checkRoles(user, 'admin')).to.equal(false)
  })
})

