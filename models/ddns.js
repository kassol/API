var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ddnsSchema = new Schema({
    ip: String,
    deviceinfo: String,
    userid: String,
    updatedate: { type: Date, default: Date.now }
});

var collectionName = 'DDNS';

module.exports = mongoose.model('DDNS', ddnsSchema, collectionName);
