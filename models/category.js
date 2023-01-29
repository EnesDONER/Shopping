const sequelize = require('../utility/database');
const Sequelize = require('sequelize');

const Category = sequelize.define('category',{
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey:true
    },
    name : Sequelize.STRING
});
module.exports= Category;
