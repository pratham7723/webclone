const express = require('express');
const router = express.Router();
const { register, login, getCurrentUser, logout } = require('../controllers/authController');
const { auth } = require('../middleware/auth');

// Register user
router.post('/register', register);

// Login user
router.post('/login', login);

// Get current user
router.get('/me', auth, getCurrentUser);

// Logout
router.post('/logout', auth, logout);

module.exports = router; 