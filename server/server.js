const express = require('express'),
  app = express(),
  port = process.env.PORT || 8080,
  mongoose = require('mongoose'),
  path = require('path'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  Food = require('./api/models/foodModel'),
  Events = require('./api/models/eventModel'),
  Drink = require('./api/models/drinkModel'),
  Contact = require('./api/models/contactModel'),
  Hours = require('./api/models/hoursModel'),
  routes = require('./api/routes/')

//MongoDB Setup
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/Cabbys')
  .catch(error => console.log(error))

//Middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/build/client')))

routes(app)

//Route to client
app.get(['/', '/About', '/Events', '/Menu'], (req,res) => {
  res.sendFile(path.join(__dirname, '/build/client/index.html'))
})

//Route to admin
app.get(['/Admin'], (req,res) => {
  res.sendFile(path.join(__dirname, '/build/admin/index.html'))
})

//Start server
app.listen(port, () => console.log(`Listening on port ${port}`))