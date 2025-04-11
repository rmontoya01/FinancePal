require('./config/env'); // Loads environment variables first
const express = require('express');
const cors = require('cors');

// Route imports
const authRoutes = require('./routes/auth.js');
const incomeRoutes = require('./routes/income.js');
const expensesRoutes = require('./routes/expenses.js');

const app = express();
const port = 3000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Route usage
app.use('/auth', authRoutes);
app.use('/income', incomeRoutes);
app.use('/expenses', expensesRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('FinancePal API is running!');
});

// Error handling middleware
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
