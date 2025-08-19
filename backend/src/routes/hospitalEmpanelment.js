const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// In-memory storage for applications (replace with database in production)
let applications = [];
let draftApplications = []; // New: Store draft applications

// Sample application for testing
applications.push({
  applicationId: 'APP001',
  hospitalName: 'Sample Hospital',
  city: 'Mumbai',
  status: 'pending',
  applicationDate: new Date().toISOString(),
  // ... other fields
});

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/hospital-empanelment';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Generate unique application ID
const generateApplicationId = () => {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `APP${timestamp}${random}`;
};

// Generate unique draft number
const generateDraftNumber = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substr(2, 3).toUpperCase();
  return `DRAFT${timestamp}${random}`;
};

// Save draft application
router.post('/save-draft', upload.fields([
  { name: 'registrationCertificate', maxCount: 1 },
  { name: 'medicalCouncilRegistration', maxCount: 1 },
  { name: 'fireSafetyCertificate', maxCount: 1 },
  { name: 'pollutionControlCertificate', maxCount: 1 },
  { name: 'buildingCompletionCertificate', maxCount: 1 },
  { name: 'otherDocuments', maxCount: 5 }
]), async (req, res) => {
  try {
    const formData = req.body;
    const uploadedFiles = req.files || {};

    // Generate draft number
    const draftNumber = generateDraftNumber();

    // Create draft application data
    const draftData = {
      draftNumber,
      savedAt: new Date().toISOString(),
      formData: {
        // Basic Information
        hospitalName: formData.hospitalName || '',
        hospitalType: formData.hospitalType || '',
        address: formData.address || '',
        city: formData.city || '',
        district: formData.district || '',
        state: formData.state || '',
        pincode: formData.pincode || '',
        phone: formData.phone || '',
        email: formData.email || '',
        website: formData.website || '',
        registrationNumber: formData.registrationNumber || '',
        establishmentDate: formData.establishmentDate || '',
        bedStrength: formData.bedStrength || '',
        ownerName: formData.ownerName || '',
        ownerDesignation: formData.ownerDesignation || '',

        // Infrastructure
        totalDoctors: formData.totalDoctors || '',
        specialistDoctors: formData.specialistDoctors || '',
        paramedicalStaff: formData.paramedicalStaff || '',
        nurses: formData.nurses || '',
        operationTheatres: formData.operationTheatres || '',
        icuBeds: formData.icuBeds || '',
        emergencyBeds: formData.emergencyBeds || '',

        // Diagnostics
        hasLaboratory: formData.hasLaboratory === 'true',
        hasRadiology: formData.hasRadiology === 'true',
        hasPharmacy: formData.hasPharmacy === 'true',
        hasBloodBank: formData.hasBloodBank === 'true',

        // Specialties
        generalSurgery: formData.generalSurgery === 'true',
        orthopedics: formData.orthopedics === 'true',
        cardiology: formData.cardiology === 'true',
        neurology: formData.neurology === 'true',
        oncology: formData.oncology === 'true',
        pediatrics: formData.pediatrics === 'true',
        gynecology: formData.gynecology === 'true',
        ophthalmology: formData.ophthalmology === 'true',
        otherSpecialties: formData.otherSpecialties || '',

        // Documents (file paths)
        documents: uploadedFiles
      }
    };

    // Store draft application
    draftApplications.push(draftData);

    res.json({
      success: true,
      message: 'Application saved as draft successfully!',
      draftNumber: draftNumber,
      data: draftData
    });

  } catch (error) {
    console.error('Error saving draft:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving draft application'
    });
  }
});

// Resume draft application
router.get('/resume/:draftNumber', async (req, res) => {
  try {
    const { draftNumber } = req.params;
    
    // Find draft application
    const draft = draftApplications.find(d => d.draftNumber === draftNumber);
    
    if (!draft) {
      return res.status(404).json({
        success: false,
        message: 'Draft application not found'
      });
    }

    res.json({
      success: true,
      message: 'Draft application found',
      data: draft
    });

  } catch (error) {
    console.error('Error resuming draft:', error);
    res.status(500).json({
      success: false,
      message: 'Error resuming draft application'
    });
  }
});

// Submit final application from draft
router.post('/submit-from-draft/:draftNumber', upload.fields([
  { name: 'registrationCertificate', maxCount: 1 },
  { name: 'medicalCouncilRegistration', maxCount: 1 },
  { name: 'fireSafetyCertificate', maxCount: 1 },
  { name: 'pollutionControlCertificate', maxCount: 1 },
  { name: 'buildingCompletionCertificate', maxCount: 1 },
  { name: 'otherDocuments', maxCount: 5 }
]), async (req, res) => {
  try {
    const { draftNumber } = req.params;
    const formData = req.body;
    const uploadedFiles = req.files || {};

    // Find and remove draft application
    const draftIndex = draftApplications.findIndex(d => d.draftNumber === draftNumber);
    if (draftIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Draft application not found'
      });
    }

    const draft = draftApplications[draftIndex];

    // Create final application
    const applicationId = generateApplicationId();
    const applicationData = {
      applicationId,
      draftNumber, // Keep reference to original draft
      applicationDate: new Date().toISOString(),
      status: 'pending',
      remarks: '',
      // ... rest of the application data from formData
      ...draft.formData,
      ...formData
    };

    // Add to applications array
    applications.push(applicationData);

    // Remove from draft applications
    draftApplications.splice(draftIndex, 1);

    res.json({
      success: true,
      message: 'Application submitted successfully from draft!',
      applicationId: applicationId,
      data: applicationData
    });

  } catch (error) {
    console.error('Error submitting from draft:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting application from draft'
    });
  }
});

// Get all draft applications (for admin)
router.get('/drafts', async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Draft applications retrieved successfully',
      data: draftApplications
    });
  } catch (error) {
    console.error('Error fetching drafts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching draft applications'
    });
  }
});

// Handle hospital empanelment form submission
router.post('/', upload.fields([
  { name: 'registrationCertificate', maxCount: 1 },
  { name: 'medicalCouncilRegistration', maxCount: 1 },
  { name: 'fireSafetyCertificate', maxCount: 1 },
  { name: 'pollutionControlCertificate', maxCount: 1 },
  { name: 'buildingCompletionCertificate', maxCount: 1 },
  { name: 'otherDocuments', maxCount: 5 }
]), async (req, res) => {
  try {
    const formData = req.body;
    const uploadedFiles = req.files || {};

    // Validate required fields
    const requiredFields = [
      'hospitalName', 'hospitalType', 'address', 'city', 'district', 
      'state', 'pincode', 'phone', 'email', 'bedStrength'
    ];

    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Note: File uploads are optional for testing purposes
    // const requiredFiles = ['registrationCertificate', 'medicalCouncilRegistration'];
    // const missingFiles = requiredFiles.filter(fileField => !uploadedFiles[fileField]);

    // if (missingFiles.length > 0) {
    //   return res.status(400).json({
    //     success: false,
    //     message: `Missing required documents: ${missingFiles.join(', ')}`
    //   });
    // }

    // Create application data
    const applicationId = generateApplicationId();
    const applicationData = {
      applicationId,
      applicationDate: new Date().toISOString(),
      status: 'pending',
      remarks: '',
      // Basic Information
      hospitalName: formData.hospitalName,
      hospitalType: formData.hospitalType,
      address: formData.address,
      city: formData.city,
      district: formData.district,
      state: formData.state,
      pincode: formData.pincode,
      phone: formData.phone,
      email: formData.email,
      website: formData.website,
      registrationNumber: formData.registrationNumber,
      establishmentDate: formData.establishmentDate,
      bedStrength: formData.bedStrength,
      ownerName: formData.ownerName,
      ownerDesignation: formData.ownerDesignation,

      // Infrastructure
      totalDoctors: formData.totalDoctors,
      specialistDoctors: formData.specialistDoctors,
      paramedicalStaff: formData.paramedicalStaff,
      nurses: formData.nurses,
      operationTheatres: formData.operationTheatres,
      icuBeds: formData.icuBeds,
      emergencyBeds: formData.emergencyBeds,

      // Diagnostics
      hasLaboratory: formData.hasLaboratory === 'true',
      hasRadiology: formData.hasRadiology === 'true',
      hasPharmacy: formData.hasPharmacy === 'true',
      hasBloodBank: formData.hasBloodBank === 'true',

      // Specialties
      generalSurgery: formData.generalSurgery === 'true',
      orthopedics: formData.orthopedics === 'true',
      cardiology: formData.cardiology === 'true',
      neurology: formData.neurology === 'true',
      oncology: formData.oncology === 'true',
      pediatrics: formData.pediatrics === 'true',
      gynecology: formData.gynecology === 'true',
      ophthalmology: formData.ophthalmology === 'true',
      otherSpecialties: formData.otherSpecialties,

      // Documents
      documents: uploadedFiles
    };

    // Store application
    applications.push(applicationData);

    res.json({
      success: true,
      message: 'Application submitted successfully!',
      applicationId: applicationId,
      data: applicationData
    });

  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting application'
    });
  }
});

// Get application status
router.get('/status/:applicationId', async (req, res) => {
  try {
    const { applicationId } = req.params;
    
    // Find application in memory
    const application = applications.find(app => app.applicationId === applicationId);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.json({
      success: true,
      data: {
        applicationId: application.applicationId,
        status: application.status,
        submittedDate: application.applicationDate,
        estimatedProcessingTime: '7-10 business days'
      }
    });

  } catch (error) {
    console.error('Error fetching application status:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching application status'
    });
  }
});

// Get all applications (admin only)
router.get('/', async (req, res) => {
  try {
    // TODO: Add authentication middleware
    // TODO: Add pagination support
    
    // Return applications from memory
    const applicationsToReturn = applications.map(app => ({
      applicationId: app.applicationId,
      hospitalName: app.hospitalName,
      status: app.status,
      applicationDate: app.applicationDate,
      city: app.city,
      district: app.district,
      remarks: app.remarks
    }));

    res.json({
      success: true,
      data: applicationsToReturn
    });

  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching applications'
    });
  }
});

// Update application status (admin only)
router.patch('/:applicationId/status', async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status, remarks } = req.body;
    
    // TODO: Add authentication middleware
    
    // Find and update application in memory
    const applicationIndex = applications.findIndex(app => app.applicationId === applicationId);
    
    if (applicationIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Update application
    applications[applicationIndex] = {
      ...applications[applicationIndex],
      status,
      remarks: remarks || '',
      updatedAt: new Date()
    };
    
    // TODO: Send status update email to applicant
    
    res.json({
      success: true,
      message: 'Application status updated successfully',
      data: { 
        applicationId, 
        status, 
        remarks: remarks || '',
        updatedAt: applications[applicationIndex].updatedAt
      }
    });

  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating application status'
    });
  }
});

// Get application details by ID
router.get('/:applicationId', async (req, res) => {
  try {
    const { applicationId } = req.params;
    
    // TODO: Add authentication middleware
    
    // Find application in memory
    const application = applications.find(app => app.applicationId === applicationId);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.json({
      success: true,
      data: application
    });

  } catch (error) {
    console.error('Error fetching application details:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching application details'
    });
  }
});

module.exports = router;
