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
router.get('/', isLoggedIn, function(req, res, next) {

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
    calories: req.body.calories,
    userID: req.session.passport.user,
    addedDate: req.body.addedDate,
    carbs: req.body.carbs,
    fat: req.body.fat,
    protein: req.body.protein
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

/* GET /food/delete/:_id - deletemselected food item */
router.get('/delete/:_id', isLoggedIn, function(req, res, next) {
  //read the id value from the url
  var _id = req.params._id;

  //delete the food item
  Food.remove( { _id: _id }, function(err) {
    if (err) {
      console.log(err);
      res.render('error', {message: 'Delete Error'});
    }
    res.redirect('/food');
  });
});

/* GET /food/:_id - show the edit form */
router.get('/edit/:_id', isLoggedIn, function(req, res, next) {
  // get the id from the url
  var _id = req.params._id;

  // look up the selected Food document with this _id
  Food.findById(_id, function(err, food) {
    if(err) {
      console.log(err);
      res.render('error', {message: 'Error loading edit form'});
    }
    else {
      // load the edit form
      res.render('edit-food', {
          title: 'Edit Food',
          food: food,
          user: req.user
      });
    }
  })
});

/* POST /food/:_id - save form to process Food updates */
router.post('/edit/:_id', isLoggedIn, function(req, res, next) {
  // get the id from the url
  var _id = req.params._id;

  // instantiate a new Food object & populate it from the form
  var food = new Food( {
    _id: _id,
    food: req.body.food,
    servings: req.body.servings,
    calories: req.body.calories,
    userID: req.session.passport.user,
    addedDate: req.body.addedDate,
    carbs: req.body.carbs,
    fat: req.body.fat,
    protein: req.body.protein
  });

  // save the update using mongoose
  Food.update( { _id: _id}, food, function(err) {
    if(err){
      console.log(err);
      res.render('error', {message: 'Could not Update Food'});
    }
    else {
      res.redirect('/food');
    }
  });
});

module.exports = router;