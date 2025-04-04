require('dotenv').config({ path: 'connect.env' });

const express = require('express');
const mysql = require('mysql2'); // Use mysql2 module
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', // Allow all origins CHANGE LATER
  methods: ['GET', 'POST'],
  credentials: true,
};
app.use(cors(corsOptions)); // To allow cross-origin requests
app.use(express.json()); // For parsing application/json

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
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('JWT_SECRET:', process.env.JWT_SECRET);

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

// Login route
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const connection = await db.promise().getConnection(); // Use the promise-based connection

    try {
      // Check if user with the provided username exists
      const [users] = await connection.query(
        'SELECT * FROM Users WHERE username = ?',
        [username]
      );

      if (users.length === 0) {
        return res.status(400).json({ error: 'Invalid username or password' });
      }

      const user = users[0];

      // Compare the provided password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password_hash);

      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid username or password' });
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

      // Respond with the token
      res.status(200).json({ message: 'Login successful', token });
    } finally {
      connection.release(); // Release connection back to the pool
    }
  } catch (error) {
    console.error('Error in /login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Used to handle requests to '/'
app.get('/register', (req, res) => {
  console.log('Register route works!');
  res.send('Hello, FinancePal API is running!');
});

// ADDING INCOME FUNCTIONALITY ENDPOINT
app.post('/income', async (req, res) => {
  try {
    const { amount, month, year, source, user_id } = req.body;

    // Validation check for required fields
    if (!user_id || !source || !amount || !month || !year) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const connection = await db.promise().getConnection();
    try {
      await connection.query(
        'INSERT INTO Income (user_id, source, amount, month, year, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
        [user_id, source, amount, month, year]
      );
      res.status(201).json({ status: 'success', message: 'Income added successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error adding income:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ADDING SPENDINGS FUNCTIONALITY ENDPOINT
app.post('/spendings', async (req, res) => {
  try {
    const { user_id, amount, category, description, date } = req.body;

    if (!user_id || !amount || !category || !description || !date) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const connection = await db.promise().getConnection();
    try {
      await connection.query(
        'INSERT INTO Spendings (user_id, amount, category, description, date, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
        [user_id, amount, category, description, date]
      );
      res.status(201).json({ status: 'success', message: 'Spendings added successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error adding spendings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start server
const port = 3000; // Update if port changes
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
