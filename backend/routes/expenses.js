const express = require('express');
const router = express.Router();
const { addExpense } = require('../controllers/expensesController');

router.post('/expenses', addExpense);

module.exports = router;
