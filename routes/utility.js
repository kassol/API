var express = require('express');
var router = express.Router();
var DDNS = require('../models/ddns');

/** Submit IP */
router.route('/submitip').get(function (req, res, next) {
    res.json({ Code:1, Message: "Should not use this method!" });
}).post(function (req, res, next) {
    var ip = req.ip;
    var updatedate = Date.now();
    var deviceinfo = req.deviceinfo;
    var userid = req.userid;
    
});

router.get('/ip', function(req, res, next) {
    var query = DDNS.find({}).limit(5).sort({ updateDate: -1 });
    query.exec(function(err, results) {
        if (err) {
            res.json({ Code: 1, Message: "Error!" });
        }
        res.json({ Code: 0, Result: results });
    });
});

module.exports = router;