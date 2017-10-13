const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Gist = mongoose.model('gists');
const User = mongoose.model('users');
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');

// Gists index
router.get('/', (req, res) => {
    Gist.find({status: 'public'})
        .populate('user')
        .sort({date: 'desc'})
        .then(gists => {
            res.render('gists/index', {
                gists: gists
            });
        });
});

// Show Single Gist
router.get('/show/:id', (req, res) => {
    Gist.findOne({
        _id: req.params.id
    })
    .populate('user')
    .populate('comments.commentUser')
    .then(gist => {
        if (gist.status == 'public') {
            res.render('gists/show', {
                gist: gist
            });
        } else {
            if (req.user) {
                if(req.user.id == gist.user._id) {
                    res.render('gists/show', {
                        gist: gist
                    });
                } else {
                    res.redirect('/gists');
                }
            } else {
                res.redirect('/gists');
            }
        }
    });
});

// List gist from specific User
router.get('/user/:userId', (req, res) => {
    Gist.find({user: req.params.userId, status: 'public'})
    .populate('user')
    .then(gists => {
        res.render('gists/index', {
            gists: gists
        });
    });
});

// Logged in users stories
router.get('/my', ensureAuthenticated, (req, res) => {
    Story.find({user: req.user.id})
        .populate('user')
        .then(gists => {
        res.render('gists/index', {
            gists: gists
        });
    });
});

// Add Gist Form
router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('gists/add');
});

// Edit Gist Form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    Gist.findOne({
        _id: req.params.id
    })
    .then(gist => {
        if (gist.user != req.user.id) {
            res.redirect('/gists')
        } else {
            res.render('gists/edit', {
                gist: gist
            });
        }
    });
});

// Process Add Gist
router.post('/', (req, res) => {
    const newGist = {
        description: req.body.description,
        contents: req.body.contents,
        status: req.body.status,
        user: req.user.id
    }

    // Create Gist
    new Gist(newGist)
    .save()
    .then(gist => {
        res.redirect(`/gists/show/${gist.id}`);
    }); 
});

// Edit Gist Process
router.put('/:id', (req, res) => {
    Gist.findOne({
        _id: req.params.id
    })
    .then(gist => {
        // New Values
        gist.description = req.body.description,
        gist.contents = req.body.contents,
        gist.status = req.body.status

        gist.save()
        .then(gist => {
            res.redirect(`/gists/show/${gist.id}`);
        });
    });
})

// Delete Gist Process
router.delete('/:id', (req, res) => {
    Gist.remove({_id: req.params.id})
    .then(() => {
        res.redirect('/dashboard');
    })
})

// Add Comment
router.post('/comment/:id', (req, res) => {
    Gist.findOne({
        _id: req.params.id
    })
    .then(gist => {
        const newComment = {
            commentBody: req.body.commentBody,
            commentUser: req.user.id
        }

        // Add to comment array
        gist.comments.unshift(newComment);
        gist.save()
        .then(gist => {
            res.redirect(`/gists/show/${gist.id}`)
        })
    })
});

module.exports = router;