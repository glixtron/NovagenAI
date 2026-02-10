#!/bin/bash

echo "🚀 Deploying NovagenAI to Vercel with NextAuth..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Build the project
echo "📦 Building the project..."
npm run build

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Set up environment variables in Vercel dashboard"
echo "2. Configure Google OAuth in Google Console"
echo "3. Add your API keys to Vercel environment variables"
echo ""
echo "🔗 Required Environment Variables:"
echo "- NEXTAUTH_URL (your Vercel URL)"
echo "- NEXTAUTH_SECRET (generate a random secret)"
echo "- GOOGLE_CLIENT_ID (from Google Console)"
echo "- GOOGLE_CLIENT_SECRET (from Google Console)"
echo "- OPENAI_API_KEY"
echo "- GEMINI_API_KEY"
echo "- GROQ_API_KEY"
echo "- CLAUDE_API_KEY"
echo "- HUGGINGFACE_API_KEY"
echo ""
echo "🎯 Your app will be available at: https://your-app-name.vercel.app"
