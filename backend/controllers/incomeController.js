const db = require('../db');

exports.addIncome = async (req, res) => {
  const { amount, month, year, source, user_id } = req.body;

  if (!user_id || !source || !amount || !month || !year) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    await db.query(
      'INSERT INTO Income (user_id, source, amount, month, year, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
      [user_id, source, amount, month, year]
    );
    res.status(201).json({ message: 'Income added successfully' });
  } catch (error) {
    console.error('Income error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
