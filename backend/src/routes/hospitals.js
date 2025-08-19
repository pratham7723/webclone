const express = require('express');
const router = express.Router();
const Hospital = require('../models/Hospital');
const { auth, authorize } = require('../middleware/auth');

// Get all hospitals
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      district, 
      specialty, 
      status,
      type 
    } = req.query;

    const filter = { isActive: true };
    
    if (district) filter['address.district'] = new RegExp(district, 'i');
    if (specialty) filter.specialties = new RegExp(specialty, 'i');
    if (status) filter.empanelmentStatus = status;
    if (type) filter.type = type;

    const hospitals = await Hospital.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Hospital.countDocuments(filter);

    res.json({
      hospitals,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalHospitals: count
    });
  } catch (error) {
    console.error('Get hospitals error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get hospital by ID
router.get('/:id', async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    res.json(hospital);
  } catch (error) {
    console.error('Get hospital error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new hospital (admin only)
router.post('/', auth, authorize('admin'), async (req, res) => {
  try {
    const hospital = new Hospital(req.body);
    await hospital.save();
    res.status(201).json(hospital);
  } catch (error) {
    console.error('Create hospital error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update hospital (admin only)
router.put('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    res.json(hospital);
  } catch (error) {
    console.error('Update hospital error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete hospital (admin only)
router.delete('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndDelete(req.params.id);
    
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    res.json({ message: 'Hospital deleted successfully' });
  } catch (error) {
    console.error('Delete hospital error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 