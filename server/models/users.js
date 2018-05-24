const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  timeStamp: {
    type: Date,
    default: Date.now
  }
})

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.validPassword = function (password) {
  if (this.password != null) {
    return bcrypt.compareSync(password, this.password)
  } else {
    return false
  }
}

module.exports = mongoose.model('User', userSchema)
