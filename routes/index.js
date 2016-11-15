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
