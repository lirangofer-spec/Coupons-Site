var express = require('express');
var routerAddCoupon = express.Router();
const ejs = require('ejs');
//const coupon = require('../lib/coupon');
const Coupon = require('../models/coupon');
const json2html = require('node-json2html');
const multer = require('multer');
const User = require('../models/user');
//const couponscheme = require('../models/coupon');


/* GET users listing. */
/*
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/
/*
var myContacts = [
  { "name": "Parvez Ansari", "email": "ansariparvez@gmai.com", "mobile":"9998979695" },
  { "name": "Tayyeb Shaikh", "email": "tshaikh1981@gmai.com", "mobile":"9091929394" },
  { "name": "Ashfaque Shaikh", "email": "ashly786@gmai.com", "mobile":"8081828384" }
];
*/




routerAddCoupon.get('/addcoupon', function(req, res, next) {
  //const couponscheme = new couponscheme();
  const coupon = new Coupon();
  res.render('layout', { title: 'Coupon', page: 'add/addcoupon',  action: '/add/getcoupons' , item: coupon}
    );

});


routerAddCoupon.get('/editcoupon', function(req, res, next) {
  const coupon = new Coupon();
  res.render('layout', { title: 'Coupon', page: 'add/editcoupon',  action: '/add/geteditedcoupon' , item:  coupon
    });
});


/*
router.get('/', function(req, res, next) {
  coupon.addCoupon(req.body.name, req.body.id, req.body.category, req.body.businessType, req.body.description);
  res.render('layout', { title: 'Coupon', page: 'getcoupons', item: 
    {  coupon: coupon.listCoupon() }
    });
 
});





router.post('/uploadcouponimage', function(req, res) {
  res.render('layout', { title: 'Coupon', page: 'add/uploadcouponimage' });
});

*/
/*
routerAddCoupon.post('/getcoupons', function(req, res) {
  coupon.addCoupon(req.body.name, req.body.id, req.body.category, req.body.businessType, req.body.description);
  res.render('layout', { title: 'Coupon', page: 'getcoupons', coupon: coupon.listCoupon(), presentment : 'table' 
  });
});
*/



routerAddCoupon.post('/geteditedcoupon', async function(req, res) {
  Coupon.findOneAndUpdate({id: req.body.id}, {$set:{name:req.body.name, businessType:req.body.businessType, category: req.body.category, description:req.body.description}}, 
    {returnNewDocument: true,  useFindAndModify: false}, (err, Couponresult) => {
    if (err) {
        console.log("Something wrong when updating data!");
    }
    console.log(Couponresult);
  });
  const couponresult = await Coupon.findOne({id: req.body.id});
  console.log("After update"+ couponresult);
  res.render('layout', { title: 'Coupon', page: 'getcoupons', coupon: [couponresult], presentment : 'table', json2html: json2html  
  });
});

const postPhotoUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
      fileSize: 2 * 1024 * 1024,
  },
  fileFilter: function (req, file, cb) {
      const fname = file.originalname;
      const valid = [
          '.jpg',
          '.png',
          '.jpeg'
      ].find(ext => fname.endsWith(ext));
      cb(null, valid);
  }
}).single('postpic');


routerAddCoupon.post('/getcoupons', postPhotoUpload, async function(req, res, next) {
  //const coupon = new Coupon(req.body);
  const coupon = new Coupon(Object.assign({}, req.body, { image: req.file ? req.file.buffer : undefined }));
  //const coupon = new Coupon(req.body, { image: req.file ? req.file.buffer : undefined });
  try {
      //await coupon.create();
      await coupon.save();
  } catch(err) {
      return next(err);
  }
  const couponresult = await Coupon.find({}).sort({'_id': -1});
  res.render('layout', { title: 'Coupon', page: 'getcoupons', coupon: couponresult, presentment : 'table', json2html: json2html  
  });
});





module.exports = routerAddCoupon;
