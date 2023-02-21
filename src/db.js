const mysql = require('mysql');

const { database } = require('./config')

const connection = mysql.createConnection({
  host: database.host,
  user: database.username,
  database: database.database,
  password: database.password,
  port: database.port
});

let con = false

function getConnect() {
  if (!con)
    connection.connect();

  con = true

  return connection
}

module.exports = getConnect