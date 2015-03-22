/*
 * Sequelize configuration and setup
 *
 * Bring in the sequelize library
 * create a new db connection object
 */

var Sequelize = require('sequelize');
var pgconfig = require('./pgconfig.json');

var database_url = pgconfig['url'];

if(typeof process.env.DATABASE_URL !== 'undefined') {
    database_url = process.env.DATABASE_URL;
}

var sequelize = new Sequelize(database_url, {
    dialect: 'postgres',
    logging: console.log
});

module.exports = {
    db: sequelize,
    Sequelize: Sequelize
};
