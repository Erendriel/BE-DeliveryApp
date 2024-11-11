const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "delivery",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("DATA BASE CONNECTED");
});

module.exports = db;
