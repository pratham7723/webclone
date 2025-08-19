# 🚀 Deployment Guide - MJPJAY Website

## 📋 **Prerequisites**
- GitHub account
- Vercel account (free)
- Render account (free)

## 🎯 **Option 1: Vercel (Frontend - Recommended)**

### **Step 1: Prepare Your React App**

1. **Update API Configuration**
   ```bash
   # In src/config/api.js, update the production baseURL
   baseURL: process.env.REACT_APP_API_URL || 'https://your-backend-url.onrender.com'
   ```

2. **Create Environment Variables**
   ```bash
   # Create .env file in project root
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   ```

3. **Test Production Build**
   ```bash
   cd mjpjay-website
   npm run build
   # This should create a 'build' folder
   ```

### **Step 2: Deploy to Vercel**

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Select the `mjpjay-website` folder

3. **Configure Build Settings**
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

4. **Environment Variables**
   - Add `REACT_APP_API_URL` with your backend URL
   - Click "Deploy"

### **Step 3: Custom Domain (Optional)**
- In Vercel dashboard, go to your project
- Click "Settings" → "Domains"
- Add your custom domain

---

## 🎯 **Option 2: Render (Full-Stack)**

### **Step 1: Prepare Backend**

1. **Update CORS in backend**
   ```javascript
   // In backend/src/server.js
   app.use(cors({
     origin: ['https://your-frontend-url.vercel.app', 'http://localhost:3000'],
     credentials: true
   }));
   ```

2. **Add Render Configuration**
   ```bash
   # Create render.yaml in project root
   services:
     - type: web
       name: mjpjay-backend
       env: node
       buildCommand: npm install
       startCommand: npm start
       envVars:
         - key: NODE_ENV
           value: production
         - key: PORT
           value: 10000
   ```

### **Step 2: Deploy Backend to Render**

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add render configuration"
   git push origin main
   ```

2. **Connect to Render**
   - Go to [render.com](https://render.com)
   - Sign up/Login with GitHub
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select the `backend` folder

3. **Configure Service**
   - **Name**: `mjpjay-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

4. **Environment Variables**
   - `NODE_ENV`: `production`
   - `PORT`: `10000`

5. **Click "Create Web Service"**

### **Step 3: Update Frontend API URL**

1. **Get Backend URL from Render**
   - Copy the URL (e.g., `https://mjpjay-backend.onrender.com`)

2. **Update Frontend Environment**
   ```bash
   # In Vercel dashboard, update environment variable
   REACT_APP_API_URL=https://mjpjay-backend.onrender.com
   ```

3. **Redeploy Frontend**
   - Vercel will auto-deploy when you push changes

---

## 🔧 **Post-Deployment Setup**

### **1. Test All Features**
- ✅ Home page loads
- ✅ Navigation works
- ✅ Empanelment form works
- ✅ Feedback form works
- ✅ Admin panel works
- ✅ Resume application works

### **2. Update Documentation**
- Update README with live URLs
- Document environment variables
- Add deployment instructions

### **3. Monitor Performance**
- Check Vercel analytics
- Monitor Render service status
- Test API response times

---

## 🌐 **Final URLs**

- **Frontend**: `https://your-project.vercel.app`
- **Backend**: `https://your-backend.onrender.com`
- **Admin Panel**: `https://your-project.vercel.app/admin`

---

## 🚨 **Important Notes**

### **Free Tier Limits**
- **Vercel**: 100GB bandwidth/month, auto-sleep after inactivity
- **Render**: 750 hours/month, auto-sleep after 15 minutes

### **Data Persistence**
- Current setup uses in-memory storage
- Data will be lost on service restart
- For production: Use MongoDB Atlas (free tier available)

### **Security**
- Admin credentials are hardcoded (for testing)
- For production: Implement proper authentication
- Use environment variables for sensitive data

---

## 🆘 **Troubleshooting**

### **Common Issues**
1. **Build Failures**: Check package.json scripts
2. **API Errors**: Verify environment variables
3. **CORS Issues**: Update backend CORS configuration
4. **404 Errors**: Check Vercel routing configuration

### **Support Resources**
- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)

---

## 🎉 **Success!**

Once deployed, your MJPJAY website will be accessible worldwide with:
- Professional URLs
- Fast CDN delivery
- Automatic deployments
- Free hosting (with limits)
- Easy scaling options

**Happy Deploying! 🚀**
