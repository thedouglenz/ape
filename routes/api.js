
/*
 * API routes
 *
 * /api
 *
 */

var express = require('express');
var router = express.Router();

router.get('/projects', function(req, res, next) {
    var Project = require('../models/project').Project;
    Project.findAll().success(function(result) {
        res.json(result);
    });
});

module.exports = router;
