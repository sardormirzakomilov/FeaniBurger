const express = require('express');
const router = express.Router();
const FeaneUser = require('../models/user')

/* GET users listing. */
// router.get('/booktable', function (req, res, next) {
//   res.render('booktable', {
//     title: 'booktable',

//   })
// });


router.post('/register', async (req, res, next) => {

  const userCont = await FeaneUser.findOne({ number: req.body.number })

  if (!userCont) {
    const { number, password } = req.body

    const user = new FeaneUser({
      number, password
    })
    req.session.user = user
    await user.save()
  }
  req.session.user = userCont


  res.redirect('/menu')
})

module.exports = router;
