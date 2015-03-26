/*
 * The users model
 */

module.exports = function() {
    var sqlz = require('../config/sequelize');

    return sqlz.db.define('user', {
	id: {
	    type: sqlz.Sequelize.INTEGER,
	primaryKey: true,
	autoIncrement: true
	},
	email: {
	    type: sqlz.Sequelize.STRING,
	unique: true,
	allowNull: false,
	validate: {
	    isEmail: true
	}
	},
	username: {
	    type: sqlz.Sequelize.STRING,
	unique: true,
	allowNull: false,
	validate: {
	    isAlphanumeric: true,
	notEmpty: true,
	len: [2, 255]
	}
	},
	hash: {
	    type: sqlz.Sequelize.STRING,
	    allowNull: false
	},
	salt: {
	    type: sqlz.Sequelize.STRING,
	    allowNull: false
	}
    }, {
	instanceMethods: {
	    validatePassword: function(password) {
		console.log(this.hash + "/" + password);
		return this.hash == password;
	    }
	}
    });
};
