const path = require('path')
const Api = require('./api')

module.exports = function (app, passport) {
  app.get('/', function (req, res ) {
    res.json({
      Welcome: 'To Root'
    })
  })

  app.get('/register', function (req, res ) {
    res.sendFile(path.join(__dirname, '../testViews/createuser.html'))
    /*res.json({
      message: req.flash('registerMessage')
    })*/
  })

  app.post('/register', passport.authenticate('local-register',{
    successRedirect: '/profile',
    failureRedirect: '/register',
    failureFlash: true
  }))

  app.get('/login', function (req, res ) {
    res.sendFile(path.join(__dirname, '../testViews/login.html'))
    /*res.json({
    message: req.flash('loginMessage')
    })*/
  })

  app.post('/login', passport.authenticate('local-login',{
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }))

  app.get('/profile', isLoggedIn, function (req, res) {
    res.json({
      user: req.user
    })
  })

  app.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/')
  })

  /*****************************

  THE API
  ******************************/
  app.get('/createpost', function (req, res) {
    res.sendFile(path.join(__dirname, '../testViews/createpost.html'))
  })

  app.get('/createzone', function (req, res) {
    res.sendFile(path.join(__dirname, '../testViews/createzone.html'))
  })

  app.use('/api', Api)
}

// utility function to make sure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next()
    res.redirect('/')
}
