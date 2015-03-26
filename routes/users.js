/*
 * The router that handles /users/...
 */

var express = require('express');
var router = express.Router();

var usersModel = '../models/user';
var getUserModel = require(usersModel);

var passport = require('../config/passport/passport').passport;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/' }));

router.get('/logout', function(req, res, next) {
    req.logout();
    res.send(200);
});

router.post('/register', function(req, res, next) {
    var User = getUserModel();
    var data = {
	email: req.body.email,
	username: req.body.username,
	hash: req.body.password,
	salt: "salt"
    };
    User.create(data).success(function(user) {
	console.log("Successfully created user");
	res.sendStatus(200);
    }).error(function(err) {
	console.log(err);
	res.sendStatus(500);
    });
});

router.get('/me', function(req, res, next) {
    var User = getUserModel();
    var currentUser = req.user;
    if(typeof currentUser !== 'undefined') {
	User.find(req.user.id).then(function(user) {
    	    if(user !== null) {
    	        res.json(user.toJSON());
    	    } else {
    	        res.json({});
    	    }
    	});
    } else {
	res.json({});
    }
});

module.exports = router;
