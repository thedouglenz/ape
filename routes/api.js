/*
 * API routes
 *
 * /api/...
 *
 * This is where you generate a RESTful API
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
