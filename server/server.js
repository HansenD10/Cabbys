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
  routes = require('./routes')

//MongoDB Setup
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/Cabbys')
  .catch(error => console.log(error))

//Middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

routes(app)

//Start server
app.listen(port, () => console.log(`Listening on port ${port}`))
