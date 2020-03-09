var express = require('express');
var routertoken = express.Router();
var jwt = require('jsonwebtoken');

routertoken.get('/', function(req, res, next) {
    res.render('layout', { title: 'Token', page: 'token'  , token: null, user: req.user });
    //res.render('token', { token: null });
  });

  



    


  routertoken.post('/', function(req, res, next) {
    console.log('Here!');  
    if (req.user) {
      const token = jwt.sign(
        { id: req.user.id },
        'secret123',
        { expiresIn: '7d' }
      );
      //res.render('token', { token });
      res.render('layout', { title: 'Token', page: 'token'  , token: token, user: req.user  });
    }
    else {
        res.render('layout', { title: 'Token', page: 'token'  , token: 'Needs to be logged in', user: req.user  });
    }
  });

  
module.exports = routertoken;