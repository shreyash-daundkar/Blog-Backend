const Sequelize = require('sequelize');
const database  = require('../utils/database');

const Tag = database.define('tags', {
    name : {
        primaryKey : true,
        type : Sequelize.STRING,
        allowNull : false,
    },
});

module.exports = Tag;