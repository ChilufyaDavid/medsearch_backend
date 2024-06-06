const mysql = require('mysql')

const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rainbowsky',
  database: 'medsearch'
})

module.exports = mysqlConnection
