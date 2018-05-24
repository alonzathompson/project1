const mongoose = require('mongoose')

const zoneSchema = mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  zipcode: {
    type: String,
    default: ''
  },
  timeStamp: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Zone', zoneSchema)
