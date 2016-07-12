var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tokenSchema = new Schema({
    userid: String,
    token: String
});

var collectionName = 'Token';

module.exports = mongoose.model('Token', tokenSchema, collectionName);
