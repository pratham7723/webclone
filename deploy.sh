#!/bin/bash

echo "🚀 MJPJAY Website Deployment Script"
echo "=================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the mjpjay-website directory"
    exit 1
fi

echo "📦 Building production version..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🌐 Next steps:"
    echo "1. Push to GitHub: git add . && git commit -m 'Prepare for deployment' && git push"
    echo "2. Deploy frontend to Vercel:"
    echo "   - Go to vercel.com"
    echo "   - Import your GitHub repo"
    echo "   - Select mjpjay-website folder"
    echo "   - Deploy!"
    echo ""
    echo "3. Deploy backend to Render:"
    echo "   - Go to render.com"
    echo "   - Create new Web Service"
    echo "   - Connect your GitHub repo"
    echo "   - Select backend folder"
    echo "   - Deploy!"
    echo ""
    echo "4. Update CORS in backend with your Vercel URL"
    echo "5. Update frontend environment variables with your Render URL"
    echo ""
    echo "📚 See DEPLOYMENT_GUIDE.md for detailed instructions"
else
    echo "❌ Build failed! Please check for errors."
    exit 1
fi
