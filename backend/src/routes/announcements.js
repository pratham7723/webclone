const express = require('express');
const router = express.Router();

// Mock announcements data
const announcements = [
  {
    id: 1,
    title: 'New Package Master List Released',
    content: 'The revised package master list with updated procedures and costs is now available for reference.',
    date: '2023-06-15',
    type: 'update'
  },
  {
    id: 2,
    title: 'Health Camp Policy Update',
    content: 'Revised guidelines for conducting health camps under MJPJAY scheme.',
    date: '2023-06-05',
    type: 'policy'
  },
  {
    id: 3,
    title: 'Notice: Fake Job Offers',
    content: 'Beware of fraudulent job offers claiming to be from SHAS/MJPJAY.',
    date: '2023-05-25',
    type: 'warning'
  }
];

// Get all announcements
router.get('/', async (req, res) => {
  try {
    res.json(announcements);
  } catch (error) {
    console.error('Get announcements error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get announcement by ID
router.get('/:id', async (req, res) => {
  try {
    const announcement = announcements.find(a => a.id === parseInt(req.params.id));
    
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    res.json(announcement);
  } catch (error) {
    console.error('Get announcement error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 