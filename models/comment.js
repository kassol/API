var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    postid: String,
    commentid: String,
    comment: String,
    author: String,
    email: String,
    website: String,
    createtime: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Comment', commentSchema);
