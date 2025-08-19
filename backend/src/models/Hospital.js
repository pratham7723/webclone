const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['government', 'private', 'trust'],
    required: true
  },
  address: {
    street: String,
    city: String,
    district: String,
    state: String,
    zipCode: String
  },
  contact: {
    phone: String,
    email: String,
    website: String
  },
  specialties: [{
    type: String,
    trim: true
  }],
  facilities: [{
    type: String,
    trim: true
  }],
  bedCapacity: {
    total: Number,
    available: Number,
    icu: Number,
    general: Number
  },
  empanelmentStatus: {
    type: String,
    enum: ['active', 'inactive', 'pending', 'suspended'],
    default: 'pending'
  },
  empanelmentDate: Date,
  expiryDate: Date,
  documents: [{
    name: String,
    url: String,
    uploadedAt: Date
  }],
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for geospatial queries
hospitalSchema.index({ coordinates: '2dsphere' });

module.exports = mongoose.model('Hospital', hospitalSchema); 