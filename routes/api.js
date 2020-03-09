const express = require('express');
const passport = require('passport');
const router = express.Router();
const createError = require('http-errors');
const Category = require('../models/category');

router.use(passport.authenticate('jwt', { session: false }));


router.get('/whoami', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    if (req.user) {
        res.send({ email: req.user.email });
    } else {
        next(createError(400));
    }
});


router.get('/forgotpassword', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    if (req.user) {
        res.send({ email: req.user.email });
    } else {
        next(createError(400));
    }
});

router.get('/getCategories', passport.authenticate('jwt', { session: false }), async function(req, res, next) {
    if (req.user) {
        const category = await Category.find({});
        res.send(category);
    } else {
        next(createError(400));
    }
});


module.exports = router;