module.exports = function (req , res, next) {
    if (!req.session.isAdmin) {
        res.redirect('/admin/error')
    }
    next()
  }