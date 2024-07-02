const Sequelize = require('sequelize');
const database  = require('../utils/database');

const Post = database.define('posts', {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true,
    },
    title : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    text : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true,
    },
}, 
{
    indexes: [
      {
        unique: true,
        fields: ['id'] 
      },
    ]
  });

module.exports = Post;