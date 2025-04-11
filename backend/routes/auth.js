const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/register', (req, res) => {
  console.log('Register route works!');
  res.send('Hello, FinancePal API is running!');
});

module.exports = router;
