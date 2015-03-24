/*
 * The router that handles /users/...
 */

var express = require('express');
var router = express.Router();

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

router.get('/me', function(req, res, next) {
    var User = require('../models/user').User;
    User.findOne(req.user).then(function(user) {
	if(user !== null) {
	    res.json(user.toJSON());
	} else {
	    res.json({ status: "error", error: "User not logged in"});
	}
    });
});

module.exports = router;
