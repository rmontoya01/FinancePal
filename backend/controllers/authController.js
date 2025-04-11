const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { jwtSecret } = require('../config/env');

exports.register = async (req, res) => {
  try {
    const { email, password, name, username } = req.body;
    const connection = await db.promise().getConnection();

    try {
      const [users] = await connection.query(
        'SELECT * FROM Users WHERE email = ? OR username = ?',
        [email, username]
      );

      if (users.length > 0) {
        return res.status(400).json({ error: 'Email or Username already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await connection.query(
        'INSERT INTO Users (email, password_hash, name, username) VALUES (?, ?, ?, ?)',
        [email, hashedPassword, name, username]
      );

      res.status(201).json({ message: 'User created successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error in /register:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const connection = await db.promise().getConnection();

    try {
      const [users] = await connection.query(
        'SELECT * FROM Users WHERE username = ?',
        [username]
      );

      if (users.length === 0) {
        return res.status(400).json({ error: 'Invalid username or password' });
      }

      const user = users[0];
      const isMatch = await bcrypt.compare(password, user.password_hash);

      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid username or password' });
      }

      const token = jwt.sign({ user_id: user.user_id }, jwtSecret, { expiresIn: '1h' });

      res.status(200).json({ message: 'Login successful', token, user_id: user.user_id });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error in /login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
