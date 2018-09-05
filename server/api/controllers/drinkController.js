'use strict'

const mongoose = require('mongoose'),
  Drink = mongoose.model('Drink')

//Get the drink menu
exports.get_drink = (req, res) => {
  Drink.find({}, (err, drink) => {
    if (err)
      res.send(err)
    res.send(drink)
  })
}

//Add a Menu category
exports.add_drink_category = (req, res) => {
  let new_drink_cat = new Drink(req.body)
  new_drink_cat.save((err, drink) => {
    if (err)
      res.send(err)
    res.send(drink)
  })
}

// //Deletes category with id
exports.delete_drink_category = (req, res) => {
  Drink.remove({ _id: req.body.id }, (err, drink) => {
    if (err)
      res.send(err)
    res.json({ message: 'Drink category successfully deleted' })
  })
}

// //Add item to menu category
exports.add_item = (req, res) => {
  const new_item = { name: req.body.name, price: req.body.price, description: req.body.description}
  Drink.findByIdAndUpdate(
    req.params.id,
    { $push: {"items": new_item }},
    {safe: true, upsert: true}, 
    (err, item) => {
      if (err)
        res.send(err)
      res.json(item)
    }
  )
}

// //Deletes item (param: category id, body: item id)
exports.delete_item = (req, res) => {
  Drink.findByIdAndUpdate(
    req.params.id,
    { $pull: {"items": { _id: req.body.id}}},
    (err, item) => {
      if (err) 
        res.send(err)
      res.json(item)
    }
  )
}