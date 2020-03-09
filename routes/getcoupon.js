var express = require('express');

//const coupon = require('../lib/coupon');
var routerGetCoupon = express.Router();
const Coupon = require('../models/coupon');
const Category = require('../models/category');
const json2html = require('node-json2html');
const ejsLint = require('ejs-lint');
const sendMail = require('../lib/nodemailer');
const { Parser } = require('json2csv');
const fs = require('fs');





/* GET users listing. */
/*
routerGetCoupon.get('/getcouponstable', function(req, res) {
  //coupon.addCoupon(req.body.name, req.body.id, req.body.category, req.body.businessType, req.body.description);
  res.render('layout', { title: 'Coupon', page: 'getcoupons', coupon: coupon.listCoupon(), presentment : 'table' 
  });
});
*/


routerGetCoupon.get('/', async function(req, res, next) {
    let currentUser = null;
    if (req.session.userid) {
      currentUser = await User.findById(req.session.userid);
    }
    res.render('layout', { title: 'Coupon' , page: 'index' , user: currentUser });
});   
/*
routerGetCoupon.get('/getcouponstable', function(req, res) {
    //coupon.addCoupon(req.body.name, req.body.id, req.body.category, req.body.businessType, req.body.description);
    res.render('layout', { title: 'Coupon', page: 'getcoupons', coupon: coupon.listCoupon(), presentment : 'table' 
    });
  });
*/
routerGetCoupon.get('/getcouponstable', async function(req, res, next) {
    try {
        const totalRecords = await Coupon.estimatedDocumentCount();
        const itemsPerPage = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 1;
        const totalPages = totalRecords / itemsPerPage;
        const offset = itemsPerPage * (page - 1);
        const coupon = await Coupon.find({}).sort({_id: -1 }).limit(itemsPerPage).skip(offset);
        console.log(coupon);
        res.render('layout', { title: 'Coupon', page: 'getcoupons', coupon:  coupon , presentment : 'table', json2html: json2html, user: req.user,
        flag: 'nextpreviousbuttons', pagecounter: totalPages,
        paginate: {
            totalPages,
            url: (pageNumber) => `/get/getcouponstable/?page=${pageNumber}`
        } 
    });
    } catch (err) {
        console.log('error');
        return next(err);
    }
});

    
    




routerGetCoupon.get('/getcouponscsv', async function(req, res) {
   const json = await Coupon.find({});
   csv = coupon.couponscsv(json);
   res.setHeader('Content-disposition', 'attachment; filename=coupons.csv');
   res.set('Content-Type', 'text/csv');
   res.status(200).send(csv);
  });

routerGetCoupon.get('/specificcoupontable', async function(req, res, next) {  
    const coupon = await Coupon.findOne({id:req.query.id});
    res.render('layout', { title: 'Coupon', page: 'getcoupons', coupon:  [coupon], presentment : 'table', json2html: json2html 
});
});


routerGetCoupon.get('/img', async function(req, res, next) {
    console.log('Present image');
    const coupon = await Coupon.findOne({id:req.query.id});
    res.end(coupon.image);
});

routerGetCoupon.get('/category', async function(req, res, next) {
    console.log('Present categories');
    const category = await Category.find({});
    res.setHeader('Content-Type', 'application/json');
    res.send(category);
});


routerGetCoupon.get('/couponstomail', async function(req, res, next) {  
    res.render('layout', { title: 'Coupon', page: 'get/couponstomail', user: req.user, action: "/get/couponstomail" });
});


routerGetCoupon.post('/couponstomail', async function(req, res) {
    
    const json = await Coupon.find({});
    const fields = ['category', 'id', 'name', 'businessType', 'description', 'datecreated'];

    try {
        console.log('here1');    
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(json);
        console.log(csv);
        await fs.writeFile('coupons.csv', csv, function(err) {
            if (err) throw err;
            console.log('coupons file saved');
          });
      }
      catch(error) {
        console.error(error);
      }
      
    var path = 'C:\\coupons site\\bin';

    try {
        await sendMail(req.body.email, path); 
        
      }

      catch(error) {
        console.error(error);
      }

      finally {
        fs.unlink('C:\\coupons site\\bin\\coupons.csv', (err) => {
            if (err) {
              console.error(err)
              return
            }
      })
    }
    
      res.redirect('/get/couponstomail');

   });

/*
routerCoupon.get('/getcoupons', function(req, res, next) {
    res.render('layout', { title: 'Coupon', page: 'getcoupons', coupon: coupon.listCoupon(), presentment : 'table' });
});
*/
/*


routerCoupon.get('/edit', function(req, res, next) {
    res.render('layout', { title: 'Coupon', page: 'add/addcoupon',  action: "/coupon" , item: 
    { name: '',  id: '', category: '', businessType: '', description: ''  }
    });

});

routerCoupon.post('/', function(req, res) {
    coupon.addCoupon(req.body.name, req.body.id, req.body.category, req.body.businessType, req.body.description);
    res.render('layout', { title: 'Coupon', page: 'getcoupons', coupon: coupon.listCoupon(), presentment : 'table' 
    });
});

routerCoupon.get('/:id', function(req, res) {
    const id = req.param('id');
    res.render('coupon/edit', { item: coupon.findContactById(id)});
});

routerCoupon.post('/:id', function(req, res) {
    const id = req.param('id');
    const item = coupon.findContactById(id);
    coupon.udpateContact(id, req.body);
    res.render('coupon/edit', { item: item });
});

*/

module.exports = routerGetCoupon;
