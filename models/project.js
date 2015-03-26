/*
 * A sample model
 */

module.exports = function() {
    sqlz = require('../config/sequelize');
    return sqlz.db.define('project', {
	id: {
    	    type: sqlz.Sequelize.INTEGER,
    	    primaryKey: true,
    	    autoIncrement: true
    	},
    	title: sqlz.Sequelize.STRING,
    	description: sqlz.Sequelize.TEXT
    });
};
