'use strict'

const mongoose = require('mongoose'),
  Food = mongoose.model('Food')

//Get the food menu
exports.get_food = (req, res) => {
  Food.find({}, (err, food) => {
    if (err)
      res.send(err)
    res.send(food)
  })
}

//Rewrite Foods
exports.rewriteFoods = (req, res) => {
  Food.deleteMany({}, (err) => {
    if (!err) {
      Food.insertMany(req.body.foods, (err, docs) => {
        if (err)
          throw err;
        res.status(201)
        res.send()
      })
    }
  })
}

//Add a Menu category
exports.add_food_category = (req, res) => {
  let new_food_cat = new Food(req.body)
  new_food_cat.save(function (err, food) {
    if (err)
      res.send(err)
    res.json(food)
  })
}

// //Deletes category with id
exports.delete_food_category = (req, res) => {
  Food.deleteOne({ _id: req.body.id }, (err, food) => {
    if (err)
      res.send(err)
    res.json({ message: 'Food category successfully deleted' })
  })
}

// //Add item to menu category
exports.add_item = (req, res) => {
  const new_item = { name: req.body.name, price: req.body.price, description: req.body.description}
  Food.findByIdAndUpdate(
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
  Food.findByIdAndUpdate(
    req.params.id,
    { $pull: {"items": { _id: req.body.id}}},
    (err, item) => {
      if (err) 
        res.send(err)
      res.json(item)
    }
  )
}