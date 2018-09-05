'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Events = new Schema({
    name: String,
    description: String,
    date: Date,
    time: String
})

module.exports = mongoose.model('Events', Events)