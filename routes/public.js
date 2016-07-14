var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var uuid = require('node-uuid');
var User = require('../models/user');
var Token = require('../models/token');


/** Sign Up */
router.route('/signup').get(function (req, res, next) {
    res.json({ Code: 1, Message: 'Should not use this method!' });
}).post(function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var name = req.body.name;
    var avarter = req.body.avarter;
    if (username === undefined || username === null) {
        return res.json({ 'Code': 1, 'Message': 'Lack of parameters!' });
    }
    if (password === undefined || password === null) {
        return res.json({ 'Code': 1, 'Message': 'Lack of parameters!' });
    }
    if (email === undefined || email === null) {
        return res.json({ 'Code': 1, 'Message': 'Lack of parameters!' });
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
            user.password = crypto.pbkdf2Sync(password, 'Jarvis', 100000, 32, 'sha512').toString('hex');
            if (avarter === undefined) {
                avarter = 'http://' + req.headers.host + '/assets/img/default_avarter.png';
            }
            user.avarter = avarter;
            user.userid = uuid.v1();
            user.save(function(err) {
                if (err) {
                    return res.send(err);
                }
                res.json({ 'Code': 0, 'Message': 'Registration Successful.' });
            });
        } else {
            return res.json({ 'Code': 1, 'Message': 'Username is unavailabel.' });
        }
    });
    });

/** Sign In */
router.route('/signin').get(function(req, res, next) {
    res.json({ 'Code': 1, 'Message': 'Should not use this method!' });
}).post(function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({ 'username': username }, function(err, user) {
        if (err) {
            return res.send(err);
        }
        if (user === undefined || user === null) {
            return res.json({ 'Code': 1, 'Message': 'Username doesn\'t exist.' });
        }
        if (crypto.pbkdf2Sync(password, 'Jarvis', 100000, 32, 'sha512').toString('hex') != user.password) {
            return res.json({ 'Code': 1, 'Message': 'Password is wrong.' });
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
                res.json({ 'Code': 0, 'Message': 'Sign in successful', 'Result': { 'userId': user.userid, 'token': tokenid } });
            });
        });
    });
});

module.exports = router;