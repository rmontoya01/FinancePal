const db = require('../db');

exports.addExpense = async (req, res) => {
  try {
    const { user_id, amount, category, description } = req.body;
    if (!user_id || !amount || !category || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const connection = await db.promise().getConnection();

    try {
      await connection.query(
        'INSERT INTO Expenses (user_id, amount, category, description, created_at) VALUES (?, ?, ?, ?, NOW())',
        [user_id, amount, category, description]
      );

      res.status(201).json({ status: 'success', message: 'Expense added successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
