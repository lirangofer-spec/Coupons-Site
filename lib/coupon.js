//const json2csv = require('json2csv').parse;
const fs = require('fs');
const path = './coupons.csv'
const Coupon = require('../models/coupon');
const mongoose = require('mongoose');







class CouponItems {
    /*
    constructor() {
        
        this.coupons = [
            { id: 1, name: 'ynon', businessType : '' , category: '', description: '' },
            { id: 2, name: 'Yaron', businessType : '' , category: '', description: '' },
        ];
        this.nextId = 2;
    }
    */
    async addCoupon(id, name, businessType, category, description) {
        const newCoupon = { id: this.nextId++, name: name, businessType : businessType, category : category, description : description }
        //this.coupons.push(newCoupon);
        const coupon = new Coupon(newCoupon);
        try {
            await coupon.save();
        } catch(err) {
            return next(err);
        }
        return this.nextId - 1;
    }


    deleteCoupon(id) {
        const idx = this.coupons.findIndex(coupon => coupon.id === Number(id));
        if (idx >= 0) {
            this.coupons.splice(idx, 1);
        }
        else { 
            console.log('Coupon not found');
        }
    }

    findCouponById(id) {
        let idx = this.coupons.findIndex(item => item.id === Number(id));
        if (idx == 0) {
            return this.coupons.find(item => item.id === Number(id));         
        }
        else {
            throw new Error ('Coupon not found');
            //console.log('Coupon not found');
        }

    }
    /*
    listCoupon() {
        //return this.coupons;

    }
    */
    listCoupon() {
        //Coupon = new Coupon();
        //const coupon = mongoose.connect('mongodb://localhost/coupon', { useNewUrlParser: true });
        console.log(Coupon.find({}));
        return Coupon.find({});
        //mongoose.disconnect();
        //return await coupon.find({});
        //console.log('Result is: '+ result);
        
        //return result;

    }
    udpateCoupon(id, details) {
        const item = this.findCouponById(id);

        if (details.name) {
            item.name = details.name;
        }

        if (details.businessType) {
            item.businessType = details.businessType;
        }
        if (details.category) {
            item.category = details.category;
        }

        if (details.description) {
            item.description = details.description;
        }
        return item;
    }

    couponscsv(json) {
        const { parse } = require('json2csv');
        const fields = ['id', 'name', 'businessType', 'category', 'description'];
        const opts = { fields };

        try {
            //fs.writeFile('coupons.csv', parse(json, opts), 'utf8');
            const csv = parse(json, opts);
            console.log('here111111111111111');
          } catch (err) {
            console.error(err);
          }
        /*
        json2csv({data: json, fields: ['id', 'name', 'businessType', 'category', 'description' ]}, function(err, csv) {
            //if (err) console.log(err);
            if (err) throw err;
            console.log(csv);
            throw Error;
            
            
            /*
            if (fs.existsSync(path)) { 
                try {
                    fs.unlinkSync(path)
                  } catch(err) {
                    console.error(err)
                  }
            }
            
           //console.log('CSV here: '+csv);
            fs.writeFile('coupons.csv', csv, 'utf8', function(err) {
              if (err) throw err;
              console.log('Coupons CSV file saved');
            });
            */
          }

    

}


module.exports = new CouponItems();