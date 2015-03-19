/*
 * Run this once to generate the database schema
 */

var sqlz = require('./sequelize');

// Get each of the models
var Project = require('../models/project');

// Create each of their tables
Project.sync({force:true});

