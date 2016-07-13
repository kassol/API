var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ddnsSchema = new Schema({
    ip: String,
    deviceinfo: String,
    updatedate: { type: Date, default: Date.now }
});


module.exports = mongoose.model('DDNS', ddnsSchema);
