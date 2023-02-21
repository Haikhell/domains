var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'sys',
  password: '01012000',
  port: 3306
});

let con = false

function getConnect() {
  if (!con)
    connection.connect();

  con = true

  return connection
}

module.exports = getConnect