var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var uuid = require('node-uuid');
var User = require('../models/user');
var Token = require('../models/token');


/** Sign Up */
router.route('/signup').get(function (req, res, next) {
    res.json({ Code: 1, Message: 'Should not use this method.' });
}).post(function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var name = req.body.name;
    var avarter = req.body.avarter;
    if (username === undefined || username === null) {
        return res.json({ Code: 1, Message: '缺少参数' });
    }
    if (password === undefined || password === null) {
        return res.json({ Code: 1, Message: '缺少参数' });
    }
    if (email === undefined || email === null) {
        return res.json({ Code: 1, Message: '缺少参数' });
    }
    User.findOne({ 'username': username }, function(err, user) {
        if (err) {
            return res.send(err);
        }
        if (user === undefined || user === null) {
            user = new User();
            user.name = name;
            user.email = email;
            user.username = username;
            user.password = crypto.pbkdf2Sync(password, 'Jarvis', 100000, 512, 'sha512').toString('hex');
            //user.password = crypto.createHash('sha512').update(password).digest('hex');
            if (avarter === undefined) {
                avarter = req.headers.host + '/assets/img/default_avarter.png';
            }
            user.avarter = avarter;
            user.userid = uuid.v1();
            user.save(function(err) {
                if (err) {
                    return res.send(err);
                }
                res.json({ Code: 0, Message: '注册成功' });
            });
        } else {
            return res.json({ Code: 1, Message: '用户名已存在' });
        }
    });
    });

/** Sign In */
router.route('/signin').get(function(req, res, next) {
    res.json({ Code: 1, Message: 'Should not use this method!' });
}).post(function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({ 'username': username }, function(err, user) {
        if (err) {
            return res.send(err);
        }
        if (user === undefined) {
            return res.json({ 'Code': 1, 'Message': '没有该用户' });
        }
        if (crypto.pbkdf2Sync(password, 'Jarvis', 100000, 512, 'sha512').toString('hex') != user.password) {
            return res.json({ 'Code': 1, 'Message': '密码错误' });
        }
        var tokenid = uuid.v1();
        Token.findOne({ 'userid': user.userid }, function(err, token) {
            if (err) {
                res.send(err);
            }
            if (token === null) {
                token = new Token();
            }
            token.userid = user.userid;
            token.token = tokenid;
            token.save(function(err) {
                if (err) {
                    return res.send(err);
                }
                res.json({ 'Code': 0, 'Message': '登录成功', Result: { 'userID': user.userid, 'token': tokenid } });
            });
        });
    });
});

module.exports = router;