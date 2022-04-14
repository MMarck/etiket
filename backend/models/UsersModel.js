var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var UsersSchema = new Schema({
	"email" : String,
	'nombre' : String
});

const options={usernameField:"email"};

UsersSchema.plugin(passportLocalMongoose,options);

module.exports = mongoose.model('Users', UsersSchema, "Users");
