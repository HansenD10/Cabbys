'use strict'
const mongoose = require('mongoose'),
  Contact = mongoose.model('Contact')

//Get the contact document
exports.get_contact = (req, res) => {
  Contact.find({}, (err, contact) => {
    if (err)
      res.send(err)
    res.send(contact)
  })
}

exports.update_contact = (req, res) => {
  Contact.updateOne({ v: "1"}, {$set: req.body.data}, (err, contact) => {
    console.log(req.body.data)
    if (err)
      res.send(err)
    res.send(contact)
  })
}