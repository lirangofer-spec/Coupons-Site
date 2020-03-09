const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    datecreated: { type: Date,  default: Date.now},
    datemodified: { type: Date,  default: Date.now}


});

module.exports = mongoose.model('Category', postSchema);