'use strict'
const mongoose = require('mongoose'),
  Schema = mongoose.Schema

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

const Drink = new Schema({
  category: {
    type: String,
    required: 'Please enter a category'
  },
  items: [Item]
})

module.exports = mongoose.model('Drink', Drink)