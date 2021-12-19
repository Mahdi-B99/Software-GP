const mysql = require('mysql')

 const pool=mysql.createPool({
connectionLimit: 10,
password: "12345",
user: "root",
database: "sgp_database",
host: "localhost",
port: "3306"
})

module.exports= pool;

