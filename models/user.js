const Sequelize = require('sequelize');
const sequelize = require('../utility/database');

const User = sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:Sequelize.STRING,
    email:{type:Sequelize.STRING,allowNull:false},
    password:{type:Sequelize.STRING,allowNull:false},
    resetToken:Sequelize.STRING,
    resetTokenExpiration:Sequelize.DATE
});
module.exports = User;