const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend-url.vercel.app', // Update this with your actual Vercel URL
    'https://mjpjay-website.vercel.app'     // Example URL
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection (optional for testing)
try {
  const connectDB = require('./config/database');
  connectDB();
} catch (error) {
  console.log('Database connection failed, continuing without database for testing...');
  console.log('Error:', error.message);
}

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/hospitals', require('./routes/hospitals'));
app.use('/api/patients', require('./routes/patients'));
app.use('/api/announcements', require('./routes/announcements'));
app.use('/api/feedback', require('./routes/feedback'));
app.use('/api/hospital-empanelment', require('./routes/hospitalEmpanelment'));

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is running successfully!' });
});

// Serve static files from React app
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test the API at: http://localhost:${PORT}/api/test`);
}); 