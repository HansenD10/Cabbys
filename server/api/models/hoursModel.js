'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const hoursSchema = new Object({
  Monday: String,
  Tuesday: String,
  Wednesday: String,
  Thursday: String,
  Friday: String,
  Saturday: String,
  Sunday: String
})

const Hours = new Schema({
  hours: hoursSchema,
  v: {
    type: String,
    default: "1"
  }
})

module.exports = mongoose.model('Hours', Hours)