const config = require('../config/constants.js');
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');


var UsersSchema = new Schema({
	email: {
        type: String,
        unique: true,
        required: true
    },
	password: {
        type: String,
        unique: true,
        required: true
    },
	firstName: {
        type: String,
        required: true
    },
	lastName: {
        type: String,
        required: true
    },
	plan: {
		type: String,
		required: true,
		default: config.PLANES[0]
	}
});

UsersSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UsersSchema, "Users");
