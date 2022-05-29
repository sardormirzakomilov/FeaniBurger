module.exports = function (req, res, next) {
    if (!req.session.checkAdmin) {
        res.redirect('/admin/error')
    }
    
    next()

}