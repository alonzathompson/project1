const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  title: {
    type: String,
    unique: true,
    default: ''
  },
  body: {
    type: String,
    default: ''
  },
  timeStamp: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Post', postSchema)
