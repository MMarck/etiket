var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var refreshTokensSchema = new Schema({
	'token' : String
});

module.exports = mongoose.model('refreshTokens', refreshTokensSchema, "refreshTokens");