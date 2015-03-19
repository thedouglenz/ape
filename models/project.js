/*
 * A sample model
 */

var sqlz = require('../config/sequelize');

var Project = sqlz.db.define('Project', {
    id: {
        type: sqlz.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: sqlz.Sequelize.STRING,
    description: sqlz.Sequelize.TEXT
});

module.exports = {
    Project: Project
}
