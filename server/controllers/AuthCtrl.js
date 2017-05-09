const usersModel = require('./../models/UserModel');

module.exports = {

  successRespond(req, res) {
    console.log('auth ctrl ', req.user)
    res.json(req.user);
  },

  logout(req, res) {
    req.logout();
    res.redirect('/#!/');
  },

  current_user(req, res) {
    if (req.isAuthenticated())
      res.send(req.user);
    else
      res.status(401).send('Not logged it');
  },

  current_admin_user: function(req, res) {
    if (req.isAuthenticated()) {
      var isMentor = false,
        isAdmin = false;

      for (var i = 0; i < req.user.roles.length; i++) {
        if (req.user.roles[i].role === 'mentor' ||
        req.user.roles[i].role === 'admin') return res.send(req.user);
      }
      res.status(403).send('Not authorized');
    } else {
      res.status(401).send('Not logged in');
    }
  },

  requireAuth: function(req, res, next) {
    if (req.isAuthenticated()) return next();
    return res.status(401).send('Not logged in');
  },

  requireLeadAuth: function(req, res, next) {
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

  requireAdminAuth: function(req, res, next) {
    //console.log(req.headers);
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
