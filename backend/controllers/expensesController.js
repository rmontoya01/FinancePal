const db = require('../db');

exports.addExpense = async (req, res) => {
  const { user_id, amount, category, description } = req.body;

  if (!user_id || !amount || !category || !description) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    await db.query(
      'INSERT INTO Expenses (user_id, amount, category, description, created_at) VALUES (?, ?, ?, ?, NOW())',
      [user_id, amount, category, description]
    );
    res.status(201).json({ message: 'Expense added successfully' });
  } catch (error) {
    console.error('Expense error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
