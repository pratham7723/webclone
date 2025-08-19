const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');

// Get patient profile
router.get('/profile', auth, async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update patient profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { firstName, lastName, phone, address } = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { firstName, lastName, phone, address },
      { new: true, runValidators: true }
    ).select('-password');

    res.json(updatedUser);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 