var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var TicketsSchema = new Schema({
	'name' : String,
	'type' : String,
});
const options={usernameField:"email"};

TicketsSchema.plugin(passportLocalMongoose,options);

module.exports = mongoose.model('Tickets', TicketsSchema, "Tickets");
