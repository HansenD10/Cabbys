'use strict'
const mongoose = require('mongoose'),
  Contact = mongoose.model('Contact'),
  Drinks = mongoose.model('Drink'),
  Foods = mongoose.model('Food'),
  Hours = mongoose.model('Hours'),
  Events = mongoose.model('Events')

  
exports.get_all = async (req, res) => {
  let contact, drinks, foods, events, hours

  try {
    contact = await Contact.find({})
    drinks = await Drinks.find({}),
    foods = await Foods.find({}),
    events = await Events.find({}),
    hours = await Hours.find({})
  } catch(e) {
    res.send(e)
  }
  res.send({
    contact: contact[0] || {},
    hours: hours[0] || {},
    events: events || [],
    menu: {
      foods: foods || [],
      drinks: drinks || []
    }
  })

}
