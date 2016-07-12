var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var replySchema = new Schema({
    commentid: String,
    replyid: String
});


module.exports = mongoose.model('Reply', replySchema);
