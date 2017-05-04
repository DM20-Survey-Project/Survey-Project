const usersModel = require('./../models/UserModel');

const checkRoles = (user, role) => {
  for (var i = 0; i < user.roles.length; i++) {
    if (user.roles[i] === role)
      return true;
  }
  return false;
}
const setSignupDefaults = (user) => {
  user.cohort = 50;
  user.roles = ['student'];
  return user;
}

module.exports = {

  successResponse(req, res) {
    res.json(req.user);
  },

  /////// Will need to be DevMtn Auth ///////

  localSignup(req, res) {
    const user = setSignupDefaults(req.body);
    const newUser = new usersmodel(user);
    newUser.password = newUser.password;
    newUser.save((err, result) => {
      if (err)
        return res.status(500).send(err);
      else
        res.send(result);
    });
  },

  logout(req, res) {
    req.logout();
    res.redirect('/!#/login');
  },

  current_user(req, res) {
    if (req.isAuthenticated())
      res.send(req.user);
    else
      res.status(401).send('Not logged it');
  }
}
