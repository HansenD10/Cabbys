'use strict'

const mongoose = require('mongoose'),
  Hours = mongoose.model('Hours')

exports.get_hours = (req, res) => {
  Hours.find({}, (err, hours) => {
    if (err)
      console.log(err)
    res.send(hours)
  })
}

exports.set_hours = (req, res) => {
  Hours.update({ v: "1"}, { $set: {hours: req.body.hours}}, (err, hours) => {
    if (err)
      res.send(err)
    res.send(hours)
  })
}