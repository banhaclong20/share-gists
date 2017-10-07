const express = require('express');
const router = express.Router();
const passport = require('passport');

// Define Passport Use Google Authenticate, you can use authenticate with 'local'
router.get('/google', passport.authenticate('google', {scope: ['profile','email']}));

// Use Authenticate Request callback
router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/dashboard');
}); 

router.get('/verify', (req, res) => {
    if(req.user) {
        console.log(req.user)
    } else {
        console.log('not auth');
    }
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;