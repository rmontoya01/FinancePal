const db = require('../database');

exports.addIncome = async (req, res) => {
  const { amount, month, year, source, user_id } = req.body;
  console.log('Recieved request to add income:', req.body);

  if (!user_id || !source || !amount || !month || !year) {
    console.log('Validation error: Missing required fields');
    return res.status(400).json({ error: 'All fields are required' });
  }

  const connection = await db.promise().getConnection();

  try {
    const [user] = await connection.query(
      'SELECT * FROM Users WHERE user_id = ?',
      [user_id]
    );

    if (user.length === 0) {
      console.log('User not found', user_id);
      return res.status(400).json({ error: 'User does not exist' });
    }

    await connection.query(
      'INSERT INTO Income (user_id, source, amount, month, year, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
      [user_id, source, amount, month, year]
    );
    console.log('Income added successfully');
    res.status(201).json({ status: 'success', message: 'Income added successfully' });
  } catch (error) {
    console.error('Error adding income:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    connection.release();
  }
};
