var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    userid: String,
    name: String,
    email: String,
    username: String,
    password: String,
    avarter: String
});
var collectionName = 'User';

module.exports = mongoose.model('User', userSchema, collectionName);
