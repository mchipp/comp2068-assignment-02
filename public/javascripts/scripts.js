/*
* File: scripts.js
* Author: Mark Chipp
* Web site: week_09
* Description: jQuery scripts for the games database lesson
*/

$('.confirmation').on('click', function() {
	return confirm('Are you sure you want to delete this?');
});

// use jQuery validator to ensure passwords are equal when regisering
var validator = $('#registerForm').validate({
	rules: {
		confirm: {
			required: true,
			equalTo: '#password'
		}
	},
	messages: {
		confirm: {
			equalTo: 'Your passwords do not match'
		}
	}
});