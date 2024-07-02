const Sequelize = require('sequelize');
const database  = require('../utils/database');

const TagPost = database.define('tags-posts', {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true,
    },
});

module.exports = TagPost;