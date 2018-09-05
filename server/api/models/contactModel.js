'use strict'
const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const Contact = new Schema({
  content: {
    type: String,
    required: "Please enter content for your Contact Page."
  },
  phone: {
    type: String,
    default: "N/A"
  },
  email: {
    type: String,
    default: "N/A"
  },
  twitter: {
    type: String,
    default: "N/A"
  },
  instagram: {
    type: String,
    default: "N/A"
  },
  facebook: {
    type: String,
    default: "N/A"
  },
  snapchat: {
    type: String,
    default: "N/A"
  },
  v: {
    type: String,
    default: "1"
  }
})

module.exports = mongoose.model('Contact', Contact)