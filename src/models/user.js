const Sequelize = require('sequelize');
const database  = require('../utils/database');

const User = database.define('users', {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true,
    },
    name : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    email : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true,
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false,
    },
});

module.exports = User;