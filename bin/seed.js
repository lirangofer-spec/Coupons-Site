const category = require('../models/category');

async function main () {
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/coupon', { useNewUrlParser: true ,  useUnifiedTopology: true});


await category.create({ id: 1, name: 'Resturant', description: 'Description of resturant', datecreated: new Date().toISOString(), datemodified: new Date().toISOString()});
await category.create({ id: 2, name: 'Education', description: 'Description of education', datecreated: new Date().toISOString(), datemodified: new Date().toISOString()});
await category.create({ id: 3, name: 'Attraction', description: 'Description of attraction', datecreated: new Date().toISOString(), datemodified: new Date().toISOString()});
await category.create({ id: 4, name: 'Vacation', description: 'Description of vacation', datecreated: new Date().toISOString(), datemodified: new Date().toISOString()});


mongoose.disconnect();

}

async function main1 () {
    const json2html = require('node-json2html');
 
    let template = {'<>':'div','html':'${title} ${year}'};
    
    let data = [
        {"title":"Heat","year":"1995"},
        {"title":"Snatch","year":"2000"},
        {"title":"Up","year":"2009"},
        {"title":"Unforgiven","year":"1992"},
        {"title":"Amadeus","year":"1984"}
    ];
        
    let html = json2html.transform(data,template);
        
    }

main();