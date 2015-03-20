/*
 * The router that handles the home page
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var options = { root: __dirname + "/public" }
  res.sendFile('index.html', options,  function(err) {
    console.log(err);
  });
});

module.exports = router;
