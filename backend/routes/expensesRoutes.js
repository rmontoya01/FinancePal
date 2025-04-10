const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expensesController.js');

router.post('/', expensesController.addExpense);

module.exports = router;
// Compare this snippet from backend/controllers/incomeController.js: