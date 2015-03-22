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

var projectsModel = '../models/project';
var getProjectModel = function() {
    return require(projectsModel).Project;
}

/* The projects API */
router.get('/projects', function(req, res, next) {
    var Project = require('../models/project').Project;
    Project.findAll().success(function(result) {
        res.json(result);
    });
});

router.post('/projects', function(req, res, next) {
    var Project = getProjectModel();
    var data = {
	title: req.body.title,
	description: req.body.description
    };
    Project.create(data).success(function(project) {
	console.log("Successfully created project");
	res.send(200);
    });
});

module.exports = router;
