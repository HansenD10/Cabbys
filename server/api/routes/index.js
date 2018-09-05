'use strict'

module.exports = (app) => {
  let food = require('../controllers/foodController'),
    events = require('../controllers/eventController'),
    drink = require('../controllers/drinkController'),
    contact = require('../controllers/contactController'),
    hours = require('../controllers/hoursController')

  app.route('/api/foods')
    .get(food.get_food)
    .post(food.add_food_category)
    .delete(food.delete_food_category)
  
  app.route('/api/drinks')
    .get(drink.get_drink)
    .post(drink.add_drink_category)
    .delete(drink.delete_drink_category)

  app.route('/api/foods/:id')
    .post(food.add_item)
    .delete(food.delete_item)

  app.route('/api/drinks/:id')
    .post(drink.add_item)
    .delete(drink.delete_item)
  
  app.route('/api/events')
    .get(events.get_events)
    .post(events.add_event)
    .delete(events.delete_event)

  app.route('/api/contact')
    .get(contact.get_contact)
    .put(contact.update_contact)

  app.route('/api/hours')
    .get(hours.get_hours)
    .put(hours.set_hours)
}
