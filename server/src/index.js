'use strict'
const express = require('express')
const db = require('../config/db')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const session = require('express-session')
const port = require('../config/port')
const morgan = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')
const cors = require('cors')

const app = express()
mongoose.connect(db.url, {
  useMongoClient: true
}, function(err){
  if (err) {
    console.log(err)
    return
  }
  console.log('DB CONNECTED: ' + db.url )
})

require('../config/passport')(passport)
//app.use(express.static(path.join(__dirname + '../client/public/build')))
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use(session({
  secret: 'thotsonpotswhodrop',
  saveUninitialized: true,
  resave: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
require('../routes/routes')(app, passport)

app.listen(port.port, (err) => {
  if (err) {
    throw err
  } else {
    console.log(`
      listening on port: ${port.port}
      =================================
      Running on ${process.env.NODE_ENV}
      =================================
      Make something great
      `)
  }
})
