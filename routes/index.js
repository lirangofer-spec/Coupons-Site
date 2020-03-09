var express = require('express');
const ejs = require('ejs');
var router = express.Router();
const coupon = require('../models/coupon');
const User = require('../models/user');


async function customer (req, res, next) {
let currentUser = null;
if (req.session.userid) {
  currentUser = await User.findById(req.session.userid);
  }
  return currentUser;
}

/* GET home page. */
router.get('/', async function(req, res, next) {
  // session
  /*
  let currentUser = null;
  if (req.session.userid) {
    currentUser = await User.findById(req.session.userid);
  }
req.user
  res.render('layout', { title: 'Coupon' , page: 'index' , user:  customer().currentUser  });
  */
 res.render('layout', { title: 'Coupon' , page: 'index' , user: req.user});
});

router.get('/about', function(req, res, next) {
  res.render('layout', { title: 'Coupon' , page: 'about' });
});

router.get('/add', async function(req, res) {
  //let currentUser = null;
  //if (req.session.userid) {
  //  currentUser = await User.findById(req.session.userid);
  //}
  res.render('layout', { title: 'Coupon', page: 'add'  , user: req.user });
});

router.get('/presentcoupons', function(req, res) {
  res.render('presentcoupons' , { title: 'Welcome to present Coupons as' });
});

router.get('/specificcoupontable', function(req, res) {
  res.render('layout' ,  { title: 'Coupon', page: 'get/specificcoupontable', action: '/get/specificcoupontable', item: coupon  });
});




/*
router.get('/', async function(req, res, next) {

  let currentUser = null;
  if (req.session.userid) {
    currentUser = await User.findById(req.session.userid);
  }

  res.render('index', { title: 'Express', user: currentUser });
});


/*
router.get('/getcoupons', function(req, res) {
  res.render('getcoupons', { title: 'Welcome to get Coupons as' });
});
*/

module.exports = router;
