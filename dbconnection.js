const mysql = require('mysql2/promise');
require('dotenv').config()

const pool = mysql.createPool({
  host: 'localhost',        
  user: process.env.SQL_USERNAME,     
  password: process.env.SQL_PASSWORD, 
  database: 'my_db',   
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
