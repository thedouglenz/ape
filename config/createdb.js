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
var User = require('../models/user').User;

// Create each of their tables
Project.sync({force:true});
User.sync({force:true});


// TODO: This just in - we can use sqlz.sync(), sqlz.drop(), etc. to handle ALL tables
