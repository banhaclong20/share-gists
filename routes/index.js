const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Gist = mongoose.model('gists');
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');

router.get('/', ensureGuest, (req, res) => {
    res.render('index/intro');
})

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    Gist.find({user: req.user.id})
    .then(gists => {
        res.render('index/dashboard', {
            gists: gists
        });
    })
})

module.exports = router;