'use strict'

module.exports = (app) => {
  let food = require('../controllers/foodController'),
    events = require('../controllers/eventController'),
    drink = require('../controllers/drinkController'),
    contact = require('../controllers/contactController'),
    hours = require('../controllers/hoursController'),
    all = require('../controllers/allController'),
    jwt = require('express-jwt'),
    jwks = require('jwks-rsa'),
    jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: process.env.SECRET_URI
      }),
      audience: process.env.AUDIENCE_URI,
      issuer: process.env.ISS_URI,
      algorithms: ['RS256']
    })
  
  app.route('/api/all')
    .get(all.get_all)

  app.route('/api/foods')
    .get(food.get_food)
    .post(jwtCheck, food.add_food_category)
    .delete(jwtCheck, food.delete_food_category)
  
  app.route('/api/drinks')
    .get(drink.get_drink)
    .post(jwtCheck, drink.add_drink_category)
    .delete(jwtCheck, drink.delete_drink_category)

  app.route('/api/foods/:id')
    .post(jwtCheck, food.add_item)
    .delete(jwtCheck, food.delete_item)

  app.route('/api/drinks/:id')
    .post(jwtCheck, drink.add_item)
    .delete(jwtCheck, drink.delete_item)
  
  app.route('/api/events')
    .get(events.get_events)
    .post(jwtCheck, events.add_event)
    .delete(jwtCheck, events.delete_event)

  app.route('/api/contact')
    .get(contact.get_contact)
    .put(jwtCheck, contact.update_contact)

  app.route('/api/hours')
    .get(hours.get_hours)
    .put(jwtCheck, hours.set_hours)
}
