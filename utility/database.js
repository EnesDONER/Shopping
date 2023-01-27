const sql = require('mysql2');

const connection = sql.createConnection({
    host:'localhost',
    user:'root',
    database:'node-app',
    password:'425385'
})
module.exports = connection.promise();