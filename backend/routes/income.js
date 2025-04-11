const express = require('express');
const router = express.Router();
const { addIncome } = require('../controllers/incomeController');

router.post('/income', addIncome);

module.exports = router;
