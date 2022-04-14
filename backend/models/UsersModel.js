var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var UsersSchema = new Schema({
	'username' : String,
	'email' : String,
	'nombre' : String
});

UsersSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Users', UsersSchema, "Users");
