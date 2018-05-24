//const passport = require('passport')

module.exports = function (passport) {
  register: {
    gettem:
      res.json({
        message: req.flash('registerMessage')
      }),
    postmy:
      passport.authenticate('local-register',{
      successRedirect: '/profile',
      failureRedirect: '/register',
      failureFlash: true
    })
  }
}
