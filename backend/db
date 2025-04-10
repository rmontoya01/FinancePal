require('dotenv').config({ path: 'connect.env' });
const mysql = require('mysql2');

// Create a MySQL connection pool
// This allows for multiple connections to be managed efficiently
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

module.exports = db.promise(); // use promise-based connection
