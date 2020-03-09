const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    id: String,
    name: String,
    category: { type: String, default: 'any' },
    businessType: String,
    description: String,
    //price: Number,
    datecreated: { type: Date,  default: Date.now},
    image: Buffer
});

module.exports = mongoose.model('Coupon', postSchema);