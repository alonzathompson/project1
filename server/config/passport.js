const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users')

module.exports = function (passport) {
  //all the functions in use with passport
  //must be declared with the function keyword
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user)
    })
  })

  passport.use('local-register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function (req, email, password, done) {
     User.findOne({email: email }, function (err, user) {
       if (err) {
        return done(err)
       }
        if (user) {
          return done(null, false, req.flash('registerMessage', 'Email already taken!'))
       } else {
        //this newUser variable is must be declared with var for hoisting issues
        var newUser = new User()
        newUser.email = email
        newUser.password = newUser.generateHash(password)
        newUser.save(function (err) {
          if (err) {
            throw err
          } else {
          return done(null, newUser)
          }
        })
        }
      })
    }
  ))

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function (req, email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      if (err) {
         return done(err)
      }
        if (!user) {
          return done(null, false, req.flash('loginMessage', 'Incorrect username.'))
       }
      if (!user.validPassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Incorrect password.'))
      }
      return done(null, user)
    })
  }
  ))
}
