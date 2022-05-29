var express = require('express');
var router = express.Router();
const Categories = require('../models/categories')
const Cart = require('../models/shopping')
const Foods = require('../models/addfood')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const userId = req.session.user ? req.session.user._id : null
  const fooddd = await Cart.find({ userId });
  const category = await Categories.find()
  const food = await Foods.find()
  res.render('menu', {
    title: 'menu',
    menu: true,
    category,
    food,
    fooddd
  })
});

module.exports = router;