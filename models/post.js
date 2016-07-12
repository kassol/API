var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    postid: String,
    title: String,
    author: String,
    posttime: Date,
    updatetime: Date,
    content: String,
});

var collectionName = 'Post';

module.exports = mongoose.model('Post', postSchema, collectionName);
