/*
 * createdb.js
 * Run this once to generate the database schema
 *
 * For each model, add the appropriate lines to create their
 * associated tables in the database
 */

var sqlz = require('./sequelize');

// Get each of the models
var Project = require('../models/project').Project;

// Create each of their tables
Project.sync({force:true});

