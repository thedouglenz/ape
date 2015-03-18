/*
 * A sample model
 */

var sqlz = require('../config/sequelize');

var Project = sqlz.db.define('Project', {
    title: sqlz.Sequlize.STRING,
    description: sqlz.Sequelize.TEXT
});
