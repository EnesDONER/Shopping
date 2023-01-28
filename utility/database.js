const Sequelize = require('sequelize');

const sequelize= new Sequelize('node-app','root','425385',{
    dialect:'mysql',
    host:'localhost',
});
module.exports  = sequelize;