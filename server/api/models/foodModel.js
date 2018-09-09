'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Item = new Schema({
  name: {
    type: String,
    required: 'Please enter a name'
  },
  price: {
    type: String,
    required: 'Please enter a price'
  },
  description: {
    type: String
  }
}) 

const Food = new Schema({
  category: {
    type: String,
    required: 'Please enter a category'
  },
  note: String,
  items: [Item]
})

module.exports = mongoose.model('Food', Food)