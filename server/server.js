const express = require('express')
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const Food = require('./api/models/foodModel');
const Events = require('./api/models/eventModel');
const Contact = require('./api/models/contactModel');
const Hours = require('./api/models/hoursModel');
const routes = require('./routes');
const compression = require('compression');

//MongoDB Setup
mongoose.Promise = global.Promise
mongoose.connect(process.env.DB_URL,  { useNewUrlParser: true })
  .catch(error => console.log(error))

//Middleware
app.use(compression())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

routes(app)

//Start server
app.listen(port, () => console.log(`Listening on port ${port}`))
