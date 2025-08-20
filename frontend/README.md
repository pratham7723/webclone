# MJPJAY Website - React + Express.js

A modern web application for the Mahatma Jyotirao Phule Jan Arogya Yojana (MJPJAY) health assurance scheme, built with React frontend and Express.js backend.

## Features

### Frontend (React)
- **Modern UI/UX**: Built with React and Tailwind CSS
- **Responsive Design**: Mobile-first approach
- **Interactive Components**: 
  - Photo carousel with auto-rotation
  - Service cards with hover effects
  - Navigation with dropdown menus
  - Quick links sidebar
- **Routing**: Client-side routing with React Router
- **Authentication**: Login/Register functionality
- **Real-time Updates**: Dynamic content loading

### Backend (Express.js)
- **RESTful API**: Complete CRUD operations
- **Authentication**: JWT-based authentication
- **Database**: MongoDB with Mongoose ODM
- **Security**: Password hashing, input validation
- **File Upload**: Support for document uploads
- **Email Integration**: Nodemailer for notifications

## Project Structure

```
mjpjay-website/
├── src/                    # React frontend
│   ├── components/         # Reusable components
│   ├── pages/             # Page components
│   ├── services/          # API services
│   └── utils/             # Utility functions
├── backend/               # Express.js backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   └── config/        # Configuration files
│   └── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Frontend Setup
```bash
# Navigate to project directory
cd mjpjay-website

# Install dependencies
npm install

# Start development server
npm start
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (see .env.example)
cp .env.example .env

# Start development server
npm run dev
```

### Environment Variables
Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mjpjay
JWT_SECRET=your-secret-key-here
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
NODE_ENV=development
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Hospitals
- `GET /api/hospitals` - Get all hospitals
- `GET /api/hospitals/:id` - Get hospital by ID
- `POST /api/hospitals` - Create hospital (admin)
- `PUT /api/hospitals/:id` - Update hospital (admin)
- `DELETE /api/hospitals/:id` - Delete hospital (admin)

### Patients
- `GET /api/patients/profile` - Get patient profile
- `PUT /api/patients/profile` - Update patient profile

### Announcements
- `GET /api/announcements` - Get all announcements
- `GET /api/announcements/:id` - Get announcement by ID

### Feedback
- `GET /api/feedback` - Get all feedback
- `POST /api/feedback` - Submit feedback

## Database Models

### User
- username, email, password
- firstName, lastName, phone
- role (admin, hospital, patient, staff)
- address, isActive, lastLogin

### Hospital
- name, code, type
- address, contact information
- specialties, facilities
- bedCapacity, empanelmentStatus
- coordinates, ratings

## Technologies Used

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- Font Awesome Icons
- Axios (for API calls)

### Backend
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs (password hashing)
- Multer (file uploads)
- Nodemailer (email)

## Development

### Running in Development Mode
```bash
# Terminal 1 - Frontend
npm start

# Terminal 2 - Backend
cd backend
npm run dev
```

### Building for Production
```bash
# Build React app
npm run build

# Start production server
cd backend
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support and questions, please contact:
- Email: info@jeevandayee.gov.in
- Phone: 155 388, 1800 233 2200

## Acknowledgments

- State Health Assurance Society, Government of Maharashtra
- React and Express.js communities
- Tailwind CSS team
