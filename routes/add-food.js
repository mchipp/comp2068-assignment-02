// App Name: Assignment 2
// Author: Mark Chipp 200180985 <mark.chipp@live.ca, mark.chipp@mygeorgian.ca>
// Created: 14-Nov-2016
// Modified: 29-Nov-2016
// Food tracking and fitness application

var express = require('express');
var router = express.Router();

/* GET add-food page. */
router.get('/', function(req, res, next) {
  res.render('add-food', { 
    title: 'FoodFit',
    //user: req.user
  });
});

module.exports = router;