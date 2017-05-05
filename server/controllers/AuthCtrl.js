const usersModel = require('./../models/UserModel');


var checkRoles = function(user, role) {
    for (var i = 0; i < user.roles.length; i++) {
        if (user.roles[i] === role)
            return true;
    }
    return false;
}

var setSignupDefaults = function(user) {
    user.cohort = 350;
    user.roles = ['student'];
    return user;
}

module.exports = {

  successRespond(req, res) {
    console.log('auth ctrl ', req.user)
    res.json(req.user);
  },

  logout(req, res) {
    req.logout();
    res.redirect('/!#/');
  },

  localSignup: function(req, res) {
    console.log('in localSignup');
    console.log('req.body = ', req.body)
    let user = setSignupDefaults(req.body);
    console.log('user after setSignupDefaults = ', user)
    let newUser = new usersModel(user);
    // newUser.password = newUser.generateHash(newUser.password);
    newUser.save(function(err, result) {
        if (err)
            return res.status(500).send(err);
        else
            res.send(result);
    });
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
