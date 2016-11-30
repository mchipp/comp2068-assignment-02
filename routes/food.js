// App Name: Assignment 2
// Author: Mark Chipp 200180985 <mark.chipp@live.ca, mark.chipp@mygeorgian.ca>
// Created: 14-Nov-2016
// Modified: 29-Nov-2016
// Food tracking and fitness application

var express = require('express');
var router = express.Router();

// reference the Food model
var Food = require('../models/foods');

// auth check
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  }
  else {
    res.redirect('/login');
  }
}

// GET handler for /food
router.get('/', function(req, res, next) {

  // use Food model to run a query
  Food.find(function(err, food) {
    if (err) {
      console.log(err);
      res.render('error');
    }
    else {
      // load the food view
      res.render('food', {
        title: 'Food log',
        food: food,
      user: req.user
      });
    }
  });
});

/* GET /food/add - display empty Food form */
router.get('/add', isLoggedIn, function(req, res, next) {

  // load the blank food form
  res.render('add-food', {
    title: 'Add a food item',
    user: req.user
  });
});

/* POST /food/add - proecess form submission */
router.post('/add', isLoggedIn, function(req, res, next) {

  // use the food model and call the mongoose create function
  Food.create( {
    food: req.body.food,
    servings: req.body.servings,
    calories: req.body.calories
  }, function(err, Food) {
    if(err) {
      console.log(err);
      res.render('error');
    }
    else {
      res.redirect('/food');
    }
  });
});

module.exports = router;