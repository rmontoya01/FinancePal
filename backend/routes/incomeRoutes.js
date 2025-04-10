const express = require('express');
const router = express.Router();
const incomeController = require('../controllers/incomeController.js');

router.post('/', incomeController.addIncome);

module.exports = router;
