require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000; // Update if port changes

app.use(express.json()); // To look through JSON requests

// MySQL connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

const jwtSecret = process.env.JWT_SECRET;

// Register route
app.post('/register', async (req, res) => {
  try {
    const { email, password, fullName, username } = req.body;

    const connection = await db.getConnection();
    
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
        [email, hashedPassword, fullName, username]
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
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

