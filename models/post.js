/*
 * A sample model
 */

var sqlz = require('../config/sequelize');

var Post = sqlz.db.define('post', {
    id: {
        type: sqlz.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
   title: sqlz.Sequelize.STRING,
    description: sqlz.Sequelize.TEXT
});

module.exports = {
    Post: Post
}
