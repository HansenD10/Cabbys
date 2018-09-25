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
    contact: {
      phone: contact[0].phone,
      email: contact[0].email,
      twitter: contact[0].twitter,
      instagram: contact[0].instagram,
      facebook: contact[0].facebook,
      snapchat: contact[0].snapchat,
      content: contact[0].content,
    },
    hours: hours[0].hours || {},
    events: events || [],
    menu: {
      foods: foods || [],
      drinks: drinks || []
    }
  })

}
