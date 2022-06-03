var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var UsersSchema = new Schema({
	"email" : String,
	'firstName' : String,
    "lastName": String,
	"isVerified": Boolean,
	"emailToken": String,
});

const options={usernameField:"email"};

UsersSchema.plugin(passportLocalMongoose,options);

module.exports = mongoose.model('Users', UsersSchema, "Users");
