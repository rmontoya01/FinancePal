const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  const { email, password, name, username } = req.body;

  try {
    const [users] = await db.query(
      'SELECT * FROM Users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (users.length > 0) {
      return res.status(400).json({ error: 'Email or Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      'INSERT INTO Users (email, password_hash, name, username) VALUES (?, ?, ?, ?)',
      [email, hashedPassword, name, username]
    );

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [users] = await db.query('SELECT * FROM Users WHERE username = ?', [username]);
    if (users.length === 0) return res.status(400).json({ error: 'Invalid credentials' });

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ user_id: user.user_id }, jwtSecret, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token, user_id: user.user_id });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
