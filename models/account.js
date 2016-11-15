// App Name: Assignment 2
// Author: Mark Chipp 200180985 <mark.chipp@live.ca, mark.chipp@mygeorgian.ca>
// Created: 14-Nov-2016
// Modified: 14-Nov-2016
// Food tracking and fitness application, desktop and mobile platform compatible.

var mongoose = require('mongoose');

// reference passport-local-mongoose so passprot can use this model for user authentication
var plm = require('passport-local-mongoose');

// define the user schema
var AccountSchema = new mongoose.Schema({
    //username: String
    oauthID: String,
    created: Date
});

// used for configuring options - do we need this?
AccountSchema.plugin(plm);

// make it public
module.exports = mongoose.model('Account', AccountSchema);