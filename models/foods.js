// App Name: Assignment 2
// Author: Mark Chipp 200180985 <mark.chipp@live.ca, mark.chipp@mygeorgian.ca>
// Created: 14-Nov-2016
// Modified: 29-Nov-2016
// Food tracking and fitness application

// define a public Food class via Mongoose
var mongoose  = require('mongoose');

// define the class using mongoose schema
var foodSchema = new mongoose.Schema({
  food: {
    type: String,
    required: 'No food entered'
  },
  servings: {
    type: String
  },
  calories: {
    type: Number
  },
  userID: {
    type: String
  },
  addedDate: {
    type: Date
  },
  carbs: {
    type: Number
  },
  fat: {
    type: Number
  },
  protein: {
    type: Number
  }
});

// make the class definition public as "Food"
module.exports = mongoose.model('Food', foodSchema);
