var express = require('express');
var router = express.Router();
var DDNS = require('../models/ddns');
var User = require('../models/user');

/** Submit IP */
router.route('/submitip').get(function (req, res, next) {
    res.json({ 'Code': 1, 'Message': "Should not use this method!" });
}).post(function (req, res, next) {
    var ip = req.headers['x-real-ip'];
    if (ip === undefined) {
        ip = req.connection.remoteAddress;
    }
    var deviceinfo = req.body.deviceinfo;
    var userid = req.body.userid;
    if (userid === undefined || userid === null) {
        return res.json({ 'Code': 1, 'Message': 'Lack of parameters!' });
    }
    if (deviceinfo === undefined || deviceinfo === null) {
        return res.json({ 'Code': 1, 'Message': 'Lack of parameters!' });
    }
    User.findOne({ 'userid': userid }, function (err, user) {
        if (err) {
            return res.send(err);
        }
        if (user === null || user === undefined) {
            return res.json({ 'Code': 1, 'Message': 'No user matched!' });
        }
        DDNS.findOne({ 'deviceinfo': deviceinfo, 'userid': userid }, function (err, ddns) {
            if (err) {
                return res.send(err);
            }
            if (ddns === null) {
                ddns = new DDNS();
                ddns.deviceinfo = deviceinfo;
                ddns.userid = userid;
            }
            ddns.ip = ip;
            ddns.updatedate = Date.now();
            ddns.save(function (err) {
                if (err) {
                    return res.send(err);
                }
                return res.json({ 'Code': 0, 'Message': "Success!" });
            });
        });
    });
});

router.get('/ip', function(req, res, next) {
    var query = DDNS.find({}).limit(5).sort({ updateDate: -1 });
    query.exec(function(err, results) {
        if (err) {
            res.json({ 'Code': 1, 'Message': "Error!" });
        }
        res.json({ 'Code': 0, 'Result': results });
    });
});

module.exports = router;