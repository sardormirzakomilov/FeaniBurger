const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exhbs = require('express-handlebars')
const session = require('express-session')
const sessionMidl = require('./Middleware/session')
const mongoBase = require('connect-mongodb-session')(session)
const flash = require('connect-flash')
const indexRouter = require('./routes/index');
const menuRouter = require('./routes/menu');
const aboutRouter = require('./routes/about');
const booktableRouter = require('./routes/booktable');
const adminRouter = require('./routes/admin');
const authRouter = require('./routes/auth');
const app = express();

require('dotenv').config({ path: './.env' })

const hbs = exhbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  runtimeOptions: {
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true
  }
})
const store = new mongoBase ({
  colletion:'adminSession',
  uri: process.env.MONGO_URI,

})

// view engine setup
app.engine('hbs', hbs.engine)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(session ({
  secret: process.env.SECRET_KEY,
  resave: false,
 saveUninitialized: true,
 store



}))

require('./helper/db')()



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(sessionMidl)
app.use(flash())

app.use('/', indexRouter);
app.use('/menu', menuRouter);
app.use('/about', aboutRouter);
app.use('/', booktableRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   errr = true;
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
