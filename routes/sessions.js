var express = require('express');
var routersessions = express.Router();
const User = require('../models/user');
var passport = require('passport');


/*session
/// GET users listing
router.get('/', function(req, res, next) {
  res.render('sessions/new');
});

router.post('/', async function(req, res, next) {
    const user = await User.findOne({ email: req.body.email });
    const valid = await user.checkPassword(req.body.password);
    if (valid) {
        req.session.userid = user.id;
    } else {
        return res.render('sessions/new', { error: 'Email/Password not found'});
    }
    res.redirect('/');
});

router.post('/logout', function(req, res, next) {
    req.session.userid = null;
    res.redirect('/');
});
*/

/* GET users listing. */
routersessions.get('/', function(req, res, next) {
    res.render('sessions/new', { error: req.flash('error') });
  });

routersessions.post('/',
passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/sessions',
    failureFlash: true
})
);
  
/*
routersessions.post('/', function(req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/sessions',
        failureFlash: true
    })
    res.redirect('/');
});
*/
routersessions.post('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});


module.exports = routersessions;