#!/bin/bash

echo "🧹 MJPJAY Repository Cleanup Script"
echo "==================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the mjpjay-website directory"
    exit 1
fi

echo "📊 Current repository size:"
du -sh .

echo ""
echo "🗂️  Large directories:"
du -sh */ | sort -hr | head -10

echo ""
echo "🔍 Checking for common large directories..."

# Remove node_modules if it exists
if [ -d "node_modules" ]; then
    echo "🗑️  Removing node_modules..."
    rm -rf node_modules
fi

# Remove build directory if it exists
if [ -d "build" ]; then
    echo "🗑️  Removing build directory..."
    rm -rf build
fi

# Remove uploads directory if it exists
if [ -d "uploads" ]; then
    echo "🗑️  Removing uploads directory..."
    rm -rf uploads
fi

# Remove .vscode if it exists
if [ -d ".vscode" ]; then
    echo "🗑️  Removing .vscode directory..."
    rm -rf .vscode
fi

# Remove .idea if it exists
if [ -d ".idea" ]; then
    echo "🗑️  Removing .idea directory..."
    rm -rf .idea
fi

# Remove .DS_Store files
echo "🗑️  Removing .DS_Store files..."
find . -name ".DS_Store" -delete

# Remove log files
echo "🗑️  Removing log files..."
find . -name "*.log" -delete

# Remove coverage directory
if [ -d "coverage" ]; then
    echo "🗑️  Removing coverage directory..."
    rm -rf coverage
fi

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🏗️  Building project..."
npm run build

echo ""
echo "📊 Final repository size:"
du -sh .

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "🌐 Next steps:"
echo "1. git add ."
echo "2. git commit -m 'Clean repository for deployment'"
echo "3. git push origin main"
echo "4. Deploy to Vercel/Render"
echo ""
echo "📚 See DEPLOYMENT_GUIDE.md for deployment instructions"
