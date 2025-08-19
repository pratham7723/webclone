const express = require('express');
const router = express.Router();

// In-memory storage for feedback (replace with database in production)
let feedbacks = [
  {
    id: 1,
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@hospital.com',
    phone: '9876543210',
    category: 'hospitals',
    subject: 'Excellent MJPJAY Implementation',
    message: 'Our hospital has been part of the MJPJAY network for over a year now. The scheme has transformed healthcare access for thousands of patients in our district. The cashless treatment facility has been a game-changer for BPL families. We are proud to be part of this noble initiative.',
    rating: 5,
    feedbackType: 'appreciation',
    date: new Date('2024-03-15').toISOString(),
    status: 'resolved'
  },
  {
    id: 2,
    name: 'Rajesh Patil',
    email: 'rajesh.patil@gmail.com',
    phone: '8765432109',
    category: 'scheme',
    subject: 'Life-Saving Treatment Covered',
    message: 'My father needed emergency heart surgery and we were worried about the cost. Thanks to MJPJAY, the entire treatment was covered. The hospital staff was very professional and caring. This scheme truly gives hope to families like ours.',
    rating: 5,
    feedbackType: 'appreciation',
    date: new Date('2024-03-12').toISOString(),
    status: 'resolved'
  },
  {
    id: 3,
    name: 'Meera Desai',
    email: 'meera.desai@yahoo.com',
    phone: '7654321098',
    category: 'process',
    subject: 'Smooth Application Process',
    message: 'The hospital empanelment application process was very smooth and well-organized. The online form was easy to fill, and the support team was helpful throughout the process. We received approval within the promised timeframe.',
    rating: 4,
    feedbackType: 'suggestion',
    date: new Date('2024-03-10').toISOString(),
    status: 'resolved'
  },
  {
    id: 4,
    name: 'Anand Kumar',
    email: 'anand.kumar@clinic.com',
    phone: '6543210987',
    category: 'website',
    subject: 'User-Friendly Website',
    message: 'The MJPJAY website is very informative and easy to navigate. I found all the information I needed about hospital empanelment, package rates, and eligibility criteria. The online application system is excellent.',
    rating: 5,
    feedbackType: 'appreciation',
    date: new Date('2024-03-08').toISOString(),
    status: 'resolved'
  },
  {
    id: 5,
    name: 'Sunita Verma',
    email: 'sunita.verma@gmail.com',
    phone: '5432109876',
    category: 'hospitals',
    subject: 'Quality Healthcare Access',
    message: 'As a patient, I have experienced the quality of healthcare provided under MJPJAY. The network hospitals maintain high standards, and the treatment quality is excellent. This scheme has made quality healthcare accessible to everyone.',
    rating: 4,
    feedbackType: 'suggestion',
    date: new Date('2024-03-05').toISOString(),
    status: 'resolved'
  },
  {
    id: 6,
    name: 'Vikram Singh',
    email: 'vikram.singh@hospital.com',
    phone: '4321098765',
    category: 'scheme',
    subject: 'Comprehensive Coverage',
    message: 'The MJPJAY scheme covers a wide range of medical procedures and treatments. The package rates are reasonable, and the coverage is comprehensive. This has encouraged more hospitals to join the network.',
    rating: 5,
    feedbackType: 'appreciation',
    date: new Date('2024-03-01').toISOString(),
    status: 'resolved'
  }
];

// Get all feedback
router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    let filteredFeedbacks = feedbacks;
    
    if (type) {
      filteredFeedbacks = feedbacks.filter(f => f.type === type);
    }
    
    res.json({
      success: true,
      message: 'Feedback retrieved successfully',
      data: filteredFeedbacks
    });
  } catch (error) {
    console.error('Get feedback error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
});

// Submit feedback (no authentication required)
router.post('/', async (req, res) => {
  try {
    const { 
      name, 
      email, 
      phone, 
      category, 
      subject, 
      message, 
      rating, 
      feedbackType 
    } = req.body;
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, subject, and message are required'
      });
    }

    // Create new feedback entry
    const newFeedback = {
      id: feedbacks.length + 1,
      name,
      email,
      phone: phone || '',
      category: category || 'general',
      subject,
      message,
      rating: rating || 5,
      feedbackType: feedbackType || 'suggestion',
      date: new Date().toISOString(),
      status: 'pending' // For admin review
    };
    
    feedbacks.push(newFeedback);
    
    // TODO: Send email notification to admin
    // TODO: Send confirmation email to user
    
    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully! Thank you for your opinion.',
      data: {
        id: newFeedback.id,
        subject: newFeedback.subject,
        date: newFeedback.date
      }
    });
  } catch (error) {
    console.error('Submit feedback error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error. Please try again later.' 
    });
  }
});

// Get feedback by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = feedbacks.find(f => f.id === parseInt(id));
    
    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Feedback retrieved successfully',
      data: feedback
    });
  } catch (error) {
    console.error('Get feedback by ID error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
});

// Update feedback status (for admin use)
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminRemarks } = req.body;
    
    const feedback = feedbacks.find(f => f.id === parseInt(id));
    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }
    
    feedback.status = status;
    feedback.adminRemarks = adminRemarks;
    feedback.updatedAt = new Date().toISOString();
    
    res.json({
      success: true,
      message: 'Feedback status updated successfully',
      data: feedback
    });
  } catch (error) {
    console.error('Update feedback status error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
});

// Get feedback statistics (for admin dashboard)
router.get('/stats/overview', async (req, res) => {
  try {
    const total = feedbacks.length;
    const byStatus = feedbacks.reduce((acc, f) => {
      acc[f.status] = (acc[f.status] || 0) + 1;
      return acc;
    }, {});
    
    const byCategory = feedbacks.reduce((acc, f) => {
      acc[f.category] = (acc[f.category] || 0) + 1;
      return acc;
    }, {});
    
    const byType = feedbacks.reduce((acc, f) => {
      acc[f.feedbackType] = (acc[f.feedbackType] || 0) + 1;
      return acc;
    }, {});
    
    const avgRating = feedbacks.length > 0 
      ? feedbacks.reduce((sum, f) => sum + (f.rating || 0), 0) / feedbacks.length 
      : 0;
    
    res.json({
      success: true,
      message: 'Feedback statistics retrieved successfully',
      data: {
        total,
        byStatus,
        byCategory,
        byType,
        averageRating: Math.round(avgRating * 10) / 10
      }
    });
  } catch (error) {
    console.error('Get feedback stats error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
});

module.exports = router; 