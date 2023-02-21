const getConnect = require("./db");

const connect = getConnect()

connect.query("CREATE DATABASE test", function (err, result) {
  if (err) throw err;
  console.log("Database created");
});