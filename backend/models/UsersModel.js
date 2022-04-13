var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var UsersSchema = new Schema({
	'userId' : String,
	'username' : String,
	'email' : String,
	'password' : String,
	'nombre' : String
});

UsersSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Users', UsersSchema, "Users");
