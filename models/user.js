const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);


userSchema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcryptjs.hash(user.password, saltRounds, function (err, hash) {
        if (err) { return next(err); }
        user.password = hash;
        next();
    });
});

userSchema.methods.checkPassword = function(candidatePassword) {
    return new Promise((resolve, reject) => {
        bcryptjs.compare(candidatePassword, this.password, function (err, isMatch) {
            if (err) return reject(err);
            resolve(isMatch);
        });
    })
};

module.exports = mongoose.model('User', userSchema);