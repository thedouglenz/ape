/*
 * Bring in the sequelize library
 * create a new db connection object
 */

var Sequelize = require('sequelize');
var pgconfig = require('./pgconfig');

var sequelize = new Sequelize(pgconfig['url'], {
    dialect: 'postgres',
    logging: console.log
});

module.exports = {
    db: sequelize,
    Sequelize: Sequelize
};
