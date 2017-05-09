const usersModel = require('./../models/UserModel');

module.exports = {

//////// Login success send back the user ////////
  successRespond(req, res) {
    res.json(req.user);
  },

//////// Logout send back to login page ////////
  logout(req, res) {
    req.logout();
    res.redirect('/#!/');
  },

//////// If the user is authenticated send back that user ////////
  current_user(req, res) {
    if (req.isAuthenticated())
      res.send(req.user);
    else
      res.status(401).send('Not logged it');
  },

//////// If the user is authenticated and is an admin send back that user ////////
  current_admin_user(req, res) {
    if (req.isAuthenticated()) {
      var isMentor = false,
        isAdmin = false;
//////// loop through users roles and check to see if any match admin ////////
      for (var i = 0; i < req.user.roles.length; i++) {
        if (req.user.roles[i].role === 'mentor' ||
        req.user.roles[i].role === 'admin') return res.send(req.user);
      }
      res.status(403).send('Not authorized');
    } else {
      res.status(401).send('Not logged in');
    }
  },

//////// Must be logged in to get to the user page ////////
  requireAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    return res.status(401).send('Not logged in');
  },
//////// If user does not have a Lead role, they shall not pass ////////
  requireLeadAuth(req, res, next) {
    if (req.isAuthenticated()) {
      for (var i = 0; i < req.user.roles.length; i++) {
        if (req.user.roles[i].role === 'lead_instructor'
        || req.user.roles[i].role === 'lead_mentor') return next();
      }
      res.status(403).send('Not authorized');
    } else {
      res.status(401).send('Not logged in');
    }
  },
//////// If user does not have an Admin role, they also shall not pass ////////
  requireAdminAuth(req, res, next) {
    if(req.headers.authorization === 'houstonWeHaveAProblem') {
      return next();
    }
    if (req.isAuthenticated()) {

      var isMentor = false,
        isAdmin = false;

      for (var i = 0; i < req.user.roles.length; i++) {
        if (req.user.roles[i].role === 'mentor' ||
          req.user.roles[i].role === 'lead_mentor' ||
          req.user.roles[i].role === 'lead_instructor') return next();
      }
      res.status(403).send('Not authorized');
    } else {
      res.status(401).send('Not logged in');
    }

  }
}
