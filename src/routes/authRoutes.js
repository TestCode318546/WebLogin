const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Route สำหรับการ login
router.post('/login', authController.loginUser);

// Route สำหรับการสมัครสมาชิก
router.post('/register', authController.registerUser);

module.exports = router;
