# Troubleshooting Guide - Hospital Empanelment System

## Common Issues and Solutions

### 1. 404 Error: "Failed to load resource: the server responded with a status of 404"

**Problem**: The API endpoint is not being found.

**Solutions**:
1. **Check if backend is running**:
   ```bash
   cd mjpjay-website/backend
   npm start
   ```
   You should see: `Server running on port 5001`

2. **Test the API directly**:
   Open your browser and go to: `http://localhost:5001/api/test`
   You should see: `{"message":"Backend is running successfully!"}`

3. **Check backend console**:
   Look for any error messages in the backend terminal

4. **Verify port number**:
   Make sure the backend is running on port 5001 (not 3000)

### 2. Controlled/Uncontrolled Input Warning

**Problem**: React warning about inputs switching between controlled and uncontrolled states.

**Solution**: This has been fixed by ensuring all form fields have proper initial values. The warning should no longer appear.

### 3. Syntax Error: "The string did not match the expected pattern"

**Problem**: This usually indicates a JavaScript syntax error or API response parsing issue.

**Solutions**:
1. **Check browser console** for detailed error messages
2. **Verify backend is running** and accessible
3. **Check network tab** in browser dev tools for failed requests

### 4. Form Not Submitting

**Problem**: The form submission fails or hangs.

**Solutions**:
1. **Check browser console** for error messages
2. **Verify all required fields** are filled
3. **Check file uploads** (if any) are under 5MB
4. **Ensure backend is running** on port 5001

### 5. Admin Panel Not Loading Applications

**Problem**: Admin panel shows "No applications found" or fails to load.

**Solutions**:
1. **Check if applications exist** by submitting a test form first
2. **Verify backend API** is working
3. **Check browser console** for error messages

## Step-by-Step Debugging

### Step 1: Verify Backend Status
```bash
# Terminal 1: Start backend
cd mjpjay-website/backend
npm start

# You should see:
# Server running on port 5001
# Test the API at: http://localhost:5001/api/test
```

### Step 2: Test API Endpoints
```bash
# Test basic connectivity
curl http://localhost:5001/api/test

# Test hospital empanelment endpoint
curl http://localhost:5001/api/hospital-empanelment
```

### Step 3: Check Frontend
```bash
# Terminal 2: Start frontend
cd mjpjay-website
npm start

# Navigate to: http://localhost:3000/empanelment
```

### Step 4: Submit Test Application
1. Click "Fresh Application"
2. Click "🧪 Load Test Data (For Testing)"
3. Navigate through all tabs
4. Submit the form
5. Check browser console for logs

### Step 5: Verify in Admin Panel
1. Navigate to: http://localhost:3000/admin
2. Check if your application appears in the list
3. View application details

## Common Configuration Issues

### Port Conflicts
- **Frontend**: Should run on port 3000
- **Backend**: Should run on port 5001
- **Database**: MongoDB on port 27017 (optional for testing)

### CORS Issues
The backend has CORS enabled, but if you see CORS errors:
1. Check that `cors()` middleware is loaded in server.js
2. Verify the frontend is making requests to the correct backend URL

### File Upload Issues
- **File size limit**: 5MB per file
- **Accepted types**: PDF, JPG, JPEG, PNG
- **Upload directory**: `uploads/hospital-empanelment/` (created automatically)

## Environment Variables

### Backend (.env file)
```bash
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/mjpjay
```

### Frontend
The frontend automatically detects the environment and uses the appropriate API configuration.

## API Endpoints Reference

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/test` | Test backend connectivity |
| POST | `/api/hospital-empanelment` | Submit application |
| GET | `/api/hospital-empanelment` | Get all applications (admin) |
| GET | `/api/hospital-empanelment/:id` | Get application details |
| PATCH | `/api/hospital-empanelment/:id/status` | Update application status |
| GET | `/api/hospital-empanelment/status/:id` | Check application status |

## Logs and Debugging

### Backend Logs
Check the backend terminal for:
- Server startup messages
- API request logs
- Error messages
- Database connection status

### Frontend Logs
Check browser console for:
- API request URLs
- Response data
- Error messages
- Form submission logs

### Network Tab
In browser dev tools, check the Network tab for:
- Failed requests
- Response status codes
- Request/response headers
- Request payload

## Still Having Issues?

If you're still experiencing problems:

1. **Check all error messages** in both backend and frontend consoles
2. **Verify network connectivity** between frontend and backend
3. **Test with simple endpoints** first (like `/api/test`)
4. **Check file permissions** for uploads directory
5. **Restart both frontend and backend** services

## Getting Help

When asking for help, please include:
1. **Error messages** from both consoles
2. **Steps to reproduce** the issue
3. **Your environment** (OS, Node.js version, etc.)
4. **What you've already tried**
5. **Screenshots** of any error messages
