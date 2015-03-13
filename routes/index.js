var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var options = { root: __dirname + "/public" }
  res.sendFile('index.html', options,  function(err) {
    console.log(err);
  });
});

// The fuck api
router.get('/exampleJSON', function(req, res, next) {
  var obj = {
    what: "is",
    this: "all",
    about: "anyway"
  }
  res.send(JSON.stringify(obj));
});

module.exports = router;
