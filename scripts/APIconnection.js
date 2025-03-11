require('dotenv').config({ path: 'connect.env' });

const express = require('express');
const mysql = require('mysql2'); // Use mysql2 module
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const port = 3000; // Update if port changes

const corsOptions = {
  origin: 'http://18.191.240.219:3000',
  methods: ['GET', 'POST'],
  credentials: true,
};
app.use(cors(corsOptions)); // To allow cross-origin requests

app.use(express.json()); // To look through JSON requests

// MySQL connection pool using environment variables
const db = mysql.createPool({
  host: process.env.DB_HOST || 'financepal-db.cdk0ei2eg51x.us-east-2.rds.amazonaws.com',
  user: process.env.DB_USER || 'aydendb', // Default to root if not set
  password: process.env.DB_PASSWORD || 'Graffix2025', // Default to empty string if not set
  database: process.env.DB_NAME || 'financepal', // Replace with your DB name
  connectionLimit: 10,
});

// Debugging (Remove later)
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);

// Testing database connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  } 
  console.log('Successfully connected to the database');
  connection.release(); // Release connection back to the pool
});

// Use JWT secret from environment variables
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret'; // Default if not set

// Register route
app.post('/register', async (req, res) => {
  try {
    const { email, password, name, username } = req.body;

    const connection = await db.promise().getConnection(); // Use the promise-based connection

    try {
      // Check if email or username exists
      const [users] = await connection.query(
        'SELECT * FROM Users WHERE email = ? OR username = ?',
        [email, username]
      );

      if (users.length > 0) {
        return res.status(400).json({ error: 'Email or Username already exists' });
      }

      // Hash password before storing
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user into the database
      await connection.query(
        'INSERT INTO Users (email, password_hash, name, username) VALUES (?, ?, ?, ?)',
        [email, hashedPassword, name, username]
      );

      res.status(201).json({ message: 'User created successfully' });
    } finally {
      connection.release(); // Release connection back to the pool
    }
  } catch (error) {
    console.error('Error in /register:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
