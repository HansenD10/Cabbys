'use strict'

const mongoose = require('mongoose'),
  Events = mongoose.model('Events')

exports.get_events = (req, res) => {
  Events.find({}, null, {sort: {date: 'asc'}}, (err, events) => {
    if (err)
      res.send(err)
    res.json(events)
  })
}

exports.add_event = (req, res) => {
  let new_event = new Events(req.body)
  new_event.save((err, events) => {
    if (err)
      res.send(err)
    res.json(events)
  })
}

exports.delete_event = (req, res) => {
  Events.remove({ _id: req.body.id }, (err, event) => {
    if (err)
      res.send(err)
    res.json({ message: 'Event successfully deleted' })
  })
}
