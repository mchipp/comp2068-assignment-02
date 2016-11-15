// App Name: Assignment 2
// Author: Mark Chipp 200180985 <mark.chipp@live.ca, mark.chipp@mygeorgian.ca>
// Created: 14-Nov-2016
// Modified: 14-Nov-2016
// Food tracking and fitness application, desktop and mobile platform compatible.

var express = require('express');
var router = express.Router();

// link to Accout model
var Account = require('../models/account');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'FoodFit',
    user: req.user
  });
});

/* GET register page */
router.get('/register', function(req, res, next) {
  res.render('register', {
    title: 'Register',
    user: req.user
  });
});

/* POST register page */
router.post('/register', function(req, res, next) {
  // use passport and the Account model to save the new user
  Account.register(new Account ({ username: req.body.username }),
    req.body.password, function(err, account) {
      if (err) {
        console.log(err);
        res.render('error');
      }
      else {
        res.redirect('/login');
      }
    });
});

/* GET login page */
router.get('/login', function(req, res, next) {

  // get session messages if there are any
  var messages = req.session.messages || [];
  // clear the messages out
  req.session.messages = null;

  res.render('login', {
    title: 'Login',
    messages: messages,
    user: req.user
  });
});

/* POST login page */
router.post('/login', passport.authenticate('local', {
  successRedirect: '/', //update this when content created
  failureRedirect: '/login',
  failureMessage: 'Invalid Login' // stored in session.messages
}));

/* GET logout */
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/login');
});

/* GET facebook */
router.get('/facebook', passport.authenticate('facebook'),
function(req, res, next){
});

/* GET /facebook/callback */
router.get('/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/login',
  failureMessage: 'Invalid Login'
}), function(req, res, next) {
  // show the footfit users page (update this when content ready)
  res.redirect('/');
});

module.exports = router;
