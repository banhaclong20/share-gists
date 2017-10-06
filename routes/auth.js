const express = require('express');
const router = express.Router();
const passport = require('passport');

// Define Passport Use Google Authenticate, you can use authenticate with 'local'
router.get('/google', passport.authenticate('google', {scope: ['profile','email']}));

// Use Authenticate Request callback
router.get('/google/callback', 
    passport.authenticate('google', {failureRedirect: '/'}), 
    (req, res) => {
    // Redirect Home after successful  authentication
    res.redirect('/dashboard');
}) 

module.exports = router;