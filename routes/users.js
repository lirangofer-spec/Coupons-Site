var express = require('express');
var routerusers = express.Router();
const User = require('../models/user');

/* GET users listing. */
routerusers.get('/', function(req, res, next) {
  res.render('users/new', { user: new User() });
});

routerusers.post('/', async function(req, res, next) {
  const user = new User(req.body);
  
  try {
    await user.save();
  } catch (err) {
    return res.render('users/new', { user });
  }

  req.login(user, function(err) {
    if (err) {
      return next(err);
    }
 
  res.redirect('/');
  });
});


routerusers.get('/forgotpassword', function(req, res, next) {
  res.render('layout', { title: 'Forgot Password', page: 'passwordrecovery/forgot-password-request'  , user: req.user });
});


routerusers.post('/forgotpassword', function(req, res, next) {
  console.log('Here');  
  if (req.user) {
    const token = jwt.sign(
      { id: req.user.id },
      'secret123',
      { expiresIn: '7d' }
    );
    //res.render('token', { token });
    res.render('layout', { title: 'Reset Password', page: 'passwordrecovery/forgot-password-email'  , 
    url: 'http://localhost:3000/users/forgotpassword/reset-password/'+token, name: req.user  });
  }
  else {
      res.render('layout', { title: 'Token', page: 'token'  , token: 'Needs to be logged in', user: req.user  });
  }
});


module.exports = routerusers;