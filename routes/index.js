const express = require("express");
const router = express.Router();
const Categories = require("../models/categories");
const Addfood = require("../models/addfood");
const User = require("../models/user");
const Cart = require('../models/shopping')
const mongoose = require("mongoose");

const mapp = (cart) => {
  return cart.map(c => ({
    ...c.foodId._doc,
    id: c.foodId.id,
    count: c.count
  }))
}
/* GET home page. */
router.get("/", async function (req, res, next) {
  const userId = req.session.user ? req.session.user._id : null
  const fooddd = await Cart.find({ userId });
  const category = await Categories.find();
  const food = await Addfood.find();
  res.render("index", {
    title: "home page",
    active: true,
    category,
    food,
    fooddd
  });
});

router.post("/add/card/:id", async (req, res, next) => {
  const shop = await Addfood.findById(req.params.id);
  const userId = req.session.user ? req.session.user._id : null
 
  console.log(userId)

  // const user = await User.aggregate([
  //   {
  //     $match: {
  //       foodId: mongoose.Types.ObjectId(req.params.id),
  //     },
  //   },
  // ]);
  // console.log(user.cart.items);
  // const { name, price } = shop;

  // const shopp = new Cart({
  //   name,
  //   price,
  //   userId
  // })

  // await shopp.save();
  // res.redirect("/");
});

module.exports = router;
