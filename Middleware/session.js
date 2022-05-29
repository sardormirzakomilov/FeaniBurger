module.exports =  function (req , res , next) {
    res.locals.isAdmin = req.session.isAdmin
    res.locals.admin = req.session.admin
    res.locals.checkAdmin = !req.session.checkAdmin  
    next()
}