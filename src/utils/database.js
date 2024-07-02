const { Sequelize } = require('sequelize');
const dotenv = require("dotenv");

dotenv.config();


const database = new  Sequelize(process.env.MYSQL_DATABASE_NAME, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
    dialect: 'mysql', 
    host: process.env.MYSQL_HOST,
});

module.exports = database;