var createError = require('http-errors');
const express = require('express');
const httpLogger  = require('./lib/httpLogger');
const logger = require('./lib/logger');
var path = require('path');
var cookieParser = require('cookie-parser');
//var logger = require('morgan');


var indexRouter = require('./routes/index');
var routerAddCoupon = require('./routes/addcoupon');
var routerGetCoupon = require('./routes/getcoupon');
var routersessions = require('./routes/sessions');
var routerusers = require('./routes/users');
var routertoken = require('./routes/token');
var apiRouter = require('./routes/api');


var flash = require('connect-flash');
const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/coupon', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})



//mongoose.connect('mongodb://localhost/coupon', { useNewUrlParser: true ,  useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));

var passport = require('passport');
require('./models/initializers/passport');





//var postsRouter = require('./routes/posts');


//session
var cookieSession = require('cookie-session')
app.use(cookieSession({
  name: 'session',
  secret: 'ninja',
}));


// passport
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(logger('dev'));
app.use(httpLogger);
//app.use(httpLogger('combined', { stream: winston.stream }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/get', routerGetCoupon);
app.use('/add', routerAddCoupon);
app.use('/sessions', routersessions);
app.use('/users', routerusers);
app.use('/token', routertoken);
app.use('/api/v1.0/', apiRouter);





//app.use('/posts', postsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // winston error
  // add this line to include winston logging
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
/*
const PORT = 3000;
app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});
*/
module.exports = app;
