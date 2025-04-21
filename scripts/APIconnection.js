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

    const connection = await db.promise().getConnection();

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
      const token = jwt.sign({ user_id: user.user_id }, jwtSecret, { expiresIn: '1h' });

      // Respond with the token and user_id
      res.status(200).json({ message: 'Login successful', token, user_id: user.user_id });
    } finally {
      connection.release();
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
  const { amount, month, year, source, user_id } = req.body;
  console.log('Recieved request to add income:', req.body); // Debugging line

  // Validation check to ensure that user_id exists
  if (!user_id || !source || !amount || !month || !year) {
    console.log('Validation error: Missing required fields'); // Debugging line
    return res.status(400).json({ error: 'All fields are required' });
  }

  const connection = await db.promise().getConnection(); // get a connection from the pool

  try {
    // Check if user exists in the Users table
    const [user] = await connection.query(
      'SELECT * FROM Users WHERE user_id = ?',
      [user_id]
    );

    if (user.length === 0) {
      console.log('User not found', user_id); // Debugging line
      return res.status(400).json({ error: 'User does not exist' });
    }

    // Insert income into the Income table
    await connection.query(
      'INSERT INTO Income (user_id, source, amount, month, year, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
      [user_id, source, amount, month, year]
    );
    console.log('Income added successfully'); // Debugging line
    res.status(201).json({ status: 'success', message: 'Income added successfully' });
  } catch (error) {
    console.error('Error adding income:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ADDING EXPENSES FUNCTIONALITY ENDPOINT
app.post('/expenses', async (req, res) => {
  try {
    const { user_id, amount, category, description } = req.body;
    // Debugging line to check the request body
    if (!user_id || !amount || !category || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const connection = await db.promise().getConnection();
    try {
      // Check if user exists in the Users table
      await connection.query(
        'INSERT INTO Expenses (user_id, amount, category, description, created_at) VALUES (?, ?, ?, ?, NOW())',
        [user_id, amount, category, description]  // Correctly pass the values
      );
      res.status(201).json({ status: 'success', message: 'Expense added successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET BUDGET SUMMARY (income, expenses, total) FOR A USER 
app.get('/budget-summary/:user_id', async (req, res) => {
  const { user_id } = req.params;

  const connection = await db.promise().getConnection();
  try {
    // Total Income
    const [incomeRows] = await connection.query(
      'SELECT COALESCE(SUM(amount), 0) AS total_income FROM Income WHERE user_id = ?',
      [user_id]
    );

    // Total Expenses
    const [expenseRows] = await connection.query(
      'SELECT COALESCE(SUM(amount), 0) AS total_expense FROM Expenses WHERE user_id = ?',
      [user_id]
    );

    const income = incomeRows[0].total_income;
    const expense = expenseRows[0].total_expense;

    res.status(200).json({
      total_income: income,
      total_expense: expense,
      total_balance: income - expense,
    });
  } catch (error) {
    console.error('Error fetching budget summary:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    connection.release();
  }
});

// GET combined income and expense entries for a user
app.get('/entries/:user_id', async (req, res) => {
  const { user_id } = req.params;

  const connection = await db.promise().getConnection();
  try {
    const [incomeRows] = await connection.query(
      'SELECT income_id AS id, "income" AS type, amount, source AS category, "" AS description, created_at FROM Income WHERE user_id = ?',
      [user_id]
    );

    const [expenseRows] = await connection.query(
      'SELECT expense_id AS id, "expense" AS type, amount, category, description, created_at FROM Expenses WHERE user_id = ?',
      [user_id]
    );

    const combinedEntries = [...incomeRows, ...expenseRows];
    res.status(200).json(combinedEntries);
  } catch (error) {
    console.error('Error fetching entries:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    connection.release();
  }
});

// DELETE USER FUNCTIONALITY ENDPOINT
app.delete('/users/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;

    const connection = await db.promise().getConnection();
    try {
      // Delete related Income records
      await connection.query('DELETE FROM Income WHERE user_id = ?', [user_id]);

      // Delete related Expenses records
      await connection.query('DELETE FROM Expenses WHERE user_id = ?', [user_id]);

      // Delete User account
      const [result] = await connection.query('DELETE FROM Users WHERE user_id = ?', [user_id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ message: 'User and all related records deleted successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ADDING BUDGET FUNCTIONALITY ENDPOINT
// This endpoint allows users to set or update their monthly budget
app.post('/set-budget', async (req, res) => {
  const { user_id, monthly_budget } = req.body;

  if (!user_id || !monthly_budget) {
    return res.status(400).json({ error: 'Missing user_id or monthly_budget' });
  }

  const connection = await db.promise().getConnection();
  try {
    const [existing] = await connection.query(
      'SELECT * FROM UserBudget WHERE user_id = ?',
      [user_id]
    );

    if (existing.length > 0) {
      await connection.query(
        'UPDATE UserBudget SET monthly_budget = ?, updated_at = NOW() WHERE user_id = ?',
        [monthly_budget, user_id]
      );
    } else {
      await connection.query(
        'INSERT INTO UserBudget (user_id, monthly_budget) VALUES (?, ?)',
        [user_id, monthly_budget]
      );
    }

    res.status(200).json({ status: 'success', message: 'Budget set successfully' });
  } catch (error) {
    console.error('Error setting budget:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    connection.release();
  }
});

// GET BUDGET FUNCTIONALITY ENDPOINT
// This endpoint retrieves the user's budget
// GET USER BUDGET FUNCTIONALITY ENDPOINT (returns limit, spent, remaining, percentage)
app.get('/user-budget/:user_id', async (req, res) => {
  const { user_id } = req.params;

  const connection = await db.promise().getConnection();
  try {
    const [[budgetRow]] = await connection.query(
      'SELECT * FROM UserBudget WHERE user_id = ?',
      [user_id]
    );

    if (!budgetRow) {
      return res.status(404).json({ error: 'No budget found for user' });
    }

    const [[{ total_spent }]] = await connection.query(
      'SELECT COALESCE(SUM(amount), 0) AS total_spent FROM Expenses WHERE user_id = ?',
      [user_id]
    );

    const remaining = parseFloat(budgetRow.monthly_budget) - total_spent;
    const percentage = parseFloat(budgetRow.monthly_budget) > 0
      ? (total_spent / parseFloat(budgetRow.monthly_budget)) * 100
      : 0;

    res.status(200).json({
      budget_limit: parseFloat(budgetRow.monthly_budget),
      total_spent,
      remaining,
      percentage,
    });
  } catch (error) {
    console.error('Error fetching budget:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    connection.release();
  }
});

// Backend: /expenses/stats/:user_id
app.get('/expenses/stats/:user_id/:year/:month', async (req, res) => {
  const { user_id, year, month } = req.params;

  const connection = await db.promise().getConnection();
  try {
    const [expenseStats] = await connection.query(
      `
      SELECT category, SUM(amount) AS total
      FROM Expenses
      WHERE user_id = ?
        AND YEAR(created_at) = ?
        AND MONTH(created_at) = ?
      GROUP BY category
      `,
      [user_id, year, month]
    );

    res.status(200).json(expenseStats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    connection.release();
  }
});










// Start server
const port = 3000; // Update if port changes
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
