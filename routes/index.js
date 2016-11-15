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

module.exports = router;
