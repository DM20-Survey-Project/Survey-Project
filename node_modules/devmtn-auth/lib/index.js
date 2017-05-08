// Module dependencies
var Strategy = require('./strategy')

// Expose 'Strategy' directly from package
exports = module.exports = Strategy

// Export constructor and utils
exports.Strategy   = Strategy
exports.checkRoles = Strategy.checkRoles

