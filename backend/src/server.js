const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://mjpjay-website.onrender.com',
    'https://your-custom-domain.com' // Add your custom domain if you have one
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React build
app.use(express.static(path.join(__dirname, '../../frontend/build')));

// API Routes
app.use('/api/hospital-empanelment', require('./routes/hospitalEmpanelment'));
app.use('/api/feedback', require('./routes/feedback'));

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'MJPJAY Backend is running!' });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 5001;

// Database connection (optional for now)
// const connectDB = require('./config/database');
// try {
//   connectDB();
// } catch (error) {
//   console.log('Database connection failed, continuing without database...');
// }

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend will be served from: ${path.join(__dirname, '../../frontend/build')}`);
}); 