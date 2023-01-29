const sequelize = require('../utility/database');
const Sequelize = require('sequelize');

const Product = sequelize.define('product',{
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey:true
    },

    name : Sequelize.STRING,
    price : {
        type:Sequelize.DOUBLE,
        allowNull:false
    },
    description : Sequelize.STRING
});
module.exports = Product;