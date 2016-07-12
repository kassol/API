var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ddnsSchema = new Schema({
    ip: String,
    updateDate: { type: Date, default: Date.now }
});


module.exports = mongoose.model('DDNS', ddnsSchema);
