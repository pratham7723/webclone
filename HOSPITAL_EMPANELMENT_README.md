# Hospital Empanelment System - MJPJAY Website

This document explains how to use the new Hospital Empanelment System integrated into the MJPJAY website.

## Features

### 1. Multi-Tab Application Form
- **6 Organized Tabs**: Basic Information, Infrastructure, Diagnostics, Specialties, Documents, Declaration
- **Responsive Design**: Works on all devices
- **Form Validation**: Required field validation and error handling
- **File Uploads**: Support for multiple document types (PDF, JPG, PNG)

### 2. Save & Resume Functionality
- **Save as Draft**: Save incomplete applications with unique draft number
- **Resume Application**: Continue filling form using draft number
- **Draft Management**: Store drafts in backend for later retrieval
- **Unique Identifiers**: Each draft gets a unique `DRAFT` number

### 3. Admin Panel
- **Access**: Navigate to `/admin` directly or via login page (`/login`)
- **Authentication**: Admin login required via main Login page (`/login`)
- **Features**:
  - View all submitted applications
  - View draft applications
  - Filter by status (pending, approved, rejected, under review, draft)
  - Search by hospital name, city, or application ID
  - View detailed application information
  - Approve or reject applications
  - Update application status
  - Secure logout functionality

## Resume Application Workflow

### How to Save Draft:
1. **Fill form partially** in any tab
2. **Click "💾 Save as Draft"** button
3. **Get unique draft number** (e.g., DRAFT123456ABC)
4. **Save the draft number** for later use

### How to Resume Draft:
1. **Go to** `/empanelment` page
2. **Click "Resume Application"** button
3. **Enter your draft number** in the modal
4. **Click "Resume Application"**
5. **Form loads** with all saved data
6. **Continue filling** remaining fields
7. **Submit final application**

### Draft Number Format:
- **Format**: `DRAFT` + 6 digits + 3 letters
- **Example**: `DRAFT123456ABC`
- **Storage**: Backend stores drafts temporarily
- **Security**: Only accessible with correct draft number

## Admin Authentication

### Default Credentials
- **Username**: `admin`
- **Password**: `mjpjay2024`

### Security Features
- **Admin-Only Login**: Login page dedicated to admin authentication
- **Session Management**: 24-hour session validity
- **Protected Access**: Admin panel requires authentication
- **Automatic Logout**: Session expires after 24 hours
- **Secure Storage**: Credentials stored in localStorage (for testing)

### Access Control
- **Public Routes**: Home, Empanelment, Application Form, Login
- **Protected Routes**: Admin Panel (requires admin login via `/login`)
- **Authentication Flow**: Navigate to /login → Enter admin credentials → Access Admin Panel → Logout
- **Navigation**: Admin link removed from main navigation for security

### Login Page Features
- **Admin-Only Access**: Dedicated admin login form
- **Admin Credentials**: Always displayed for convenience
- **Error Handling**: Shows validation errors
- **Responsive Design**: Works on all devices

## API Endpoints

### Application Management
- `POST /api/hospital-empanelment` - Submit new application
- `GET /api/hospital-empanelment` - Get all applications
- `GET /api/hospital-empanelment/:id` - Get specific application
- `PATCH /api/hospital-empanelment/:id/status` - Update application status

### Draft Management
- `POST /api/hospital-empanelment/save-draft` - Save application as draft
- `GET /api/hospital-empanelment/resume/:draftNumber` - Resume draft application
- `POST /api/hospital-empanelment/submit-from-draft/:draftNumber` - Submit final application from draft
- `GET /api/hospital-empanelment/drafts` - Get all draft applications (admin only)

**Note**: For production use, implement proper backend authentication with encrypted passwords and secure session management.

## How to Test the System

### Step 1: Start the Backend
```bash
cd mjpjay-website/backend
npm install
npm start
```

The backend will run on port 5001 by default.

### Step 2: Start the Frontend
```bash
cd mjpjay-website
npm install
npm start
```

The frontend will run on port 3000 by default.

### Step 3: Test Form Submission
1. Navigate to `/empanelment` to see the eligibility criteria
2. Click "Fresh Application" to go to the form
3. Click "🧪 Load Test Data (For Testing)" to populate the form
4. Navigate through all tabs to review the data
5. Upload some test files (PDF, JPG, PNG accepted)
6. Submit the form

### Step 4: View in Admin Panel
1. Navigate to `/admin` to see the admin panel
2. You should see your submitted application in the list
3. Click "👁️ View" to see detailed information
4. Use the approve/reject buttons to change application status

## API Endpoints

### POST `/api/hospital-empanelment`
- **Purpose**: Submit new hospital empanelment application
- **Content-Type**: `multipart/form-data`
- **Features**: File uploads, form validation, data storage

### GET `/api/hospital-empanelment`
- **Purpose**: Retrieve all applications (admin only)
- **Response**: List of applications with basic information

### GET `/api/hospital-empanelment/:applicationId`
- **Purpose**: Get detailed application information
- **Response**: Complete application data

### PATCH `/api/hospital-empanelment/:applicationId/status`
- **Purpose**: Update application status
- **Body**: `{ "status": "approved|rejected|pending|under_review", "remarks": "optional notes" }`

### GET `/api/hospital-empanelment/status/:applicationId`
- **Purpose**: Check application status
- **Response**: Current status and processing time estimate

## File Upload Requirements

### Required Documents
- Hospital Registration Certificate
- Medical Council Registration

### Optional Documents
- Infrastructure Certificate
- Staff Qualification Documents
- Financial Statements

### File Types Accepted
- PDF files
- JPEG/JPG images
- PNG images

### File Size Limit
- Maximum 5MB per file

## Validation Rules

### Bed Strength
- Multispecialty hospitals: Minimum 30 beds
- Single specialty hospitals: Flexible requirements

### Staff Requirements
- Minimum 3 doctors total
- At least 1 specialist doctor
- Minimum 1 paramedical staff
- Minimum 1 nurse

### Required Fields
All fields marked with red asterisk (*) are mandatory and must be filled before submission.

## Data Storage

### Current Implementation
- **Storage**: In-memory storage (for testing)
- **Persistence**: Data is lost when server restarts
- **Production**: Should be replaced with MongoDB or similar database

### Sample Data
The system comes with one sample application (HEM001) for demonstration purposes.

## Navigation Structure

### Main Menu Updates
- **Hospitals** → **Hospital Empanelment**: View eligibility criteria
- **Hospitals** → **Apply for Empanelment**: Fill out the application form
- **Admin**: Access the admin panel

## Troubleshooting

### Common Issues

#### Form Not Submitting
- Check that all required fields are filled
- Ensure required documents are uploaded
- Verify file sizes are under 5MB
- Check browser console for error messages

#### Admin Panel Not Loading
- Verify backend is running on port 5001
- Check that the API endpoint is accessible
- Ensure CORS is properly configured

#### File Upload Errors
- Verify file type is supported (PDF, JPG, PNG)
- Check file size is under 5MB
- Ensure uploads directory has write permissions

### Backend Logs
Check the backend console for detailed error messages and application submissions.

## Future Enhancements

### Planned Features
1. **Database Integration**: Replace in-memory storage with MongoDB
2. **Authentication**: Add user login and role-based access control
3. **Email Notifications**: Send confirmation and status update emails
4. **File Storage**: Integrate with cloud storage (AWS S3, etc.)
5. **Dashboard Analytics**: Add charts and statistics for admin users
6. **Application Tracking**: Allow applicants to track their application status

### Security Improvements
1. **Input Validation**: Enhanced server-side validation
2. **File Security**: Virus scanning and file type verification
3. **Rate Limiting**: Prevent spam submissions
4. **Audit Logging**: Track all admin actions

## Support

For technical support or questions about the hospital empanelment system, please refer to the development team or create an issue in the project repository.

---

**Note**: This system is currently in development/testing phase. For production use, additional security measures, database integration, and proper authentication should be implemented.
