const mysql = require('mysql2');
const { dbConfig } = require('../config/env');

const db = mysql.createPool(dbConfig);

db.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Successfully connected to the database');
    connection.release();
  }
});

module.exports = db;
