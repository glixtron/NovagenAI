# 🚀 **Vercel Deployment Guide with NextAuth**

## ✅ **Quick Deployment Steps**

### **1. Install Vercel CLI**:
```bash
npm install -g vercel
```

### **2. Login to Vercel**:
```bash
vercel login
```

### **3. Deploy to Vercel**:
```bash
./deploy.sh
# Or manually:
npm run build
vercel --prod
```

---

## 🔧 **Environment Variables Setup**

### **Required Environment Variables in Vercel**:

#### **NextAuth Configuration**:
```
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=your-random-secret-key
```

#### **Google OAuth**:
```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

#### **AI Services**:
```
OPENAI_API_KEY=your-openai-api-key
GEMINI_API_KEY=your-gemini-api-key
GROQ_API_KEY=your-groq-api-key
CLAUDE_API_KEY=your-claude-api-key
HUGGINGFACE_API_KEY=your-huggingface-api-key
```

#### **Database & Storage**:
```
DATABASE_URL=your-postgresql-connection-string
REDIS_URL=your-redis-connection-string
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_S3_BUCKET=your-s3-bucket
```

#### **Security & Monitoring**:
```
JWT_SECRET=your-jwt-secret
ENCRYPTION_KEY=your-encryption-key
SENTRY_DSN=your-sentry-dsn
```

---

## 🎯 **Google OAuth Setup**

### **1. Go to Google Cloud Console**:
- Visit: https://console.cloud.google.com/
- Create a new project or select existing one

### **2. Enable Google+ API**:
- Go to "APIs & Services" > "Library"
- Search for "Google+ API" and enable it

### **3. Create OAuth Credentials**:
- Go to "APIs & Services" > "Credentials"
- Click "Create Credentials" > "OAuth client ID"
- Select "Web application"
- Add authorized redirect URI: `https://your-app-name.vercel.app/api/auth/callback/google`

### **4. Get Credentials**:
- Copy the Client ID and Client Secret
- Add them to Vercel environment variables

---

## 🔐 **NextAuth Configuration**

### **Current Setup**:
- **Provider**: Google OAuth
- **Callbacks**: JWT and session handling
- **Pages**: Custom sign-in/sign-out pages
- **Secret**: Environment variable based

### **Authentication Flow**:
1. User clicks "Sign in with Google"
2. Redirects to Google OAuth
3. Google redirects back to `/api/auth/callback/google`
4. NextAuth processes the callback
5. User is authenticated and redirected

---

## 📁 **Project Structure for Vercel**

```
├── pages/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth].ts    # NextAuth API route
│   ├── _app.tsx                    # App component
│   ├── _layout.tsx                  # Layout component
│   └── auth/
│       ├── signin.tsx              # Sign-in page
│       └── signout.tsx             # Sign-out page
├── lib/
│   └── auth.ts                     # NextAuth configuration
├── vercel.json                     # Vercel configuration
└── deploy.sh                       # Deployment script
```

---

## 🌐 **Vercel Configuration**

### **vercel.json**:
```json
{
  "version": 2,
  "name": "novagenai",
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "env": {
    "NEXTAUTH_URL": "@nextauth_url",
    "NEXTAUTH_SECRET": "@nextauth_secret"
  },
  "build": {
    "env": {
      "NEXTAUTH_URL": "@nextauth_url"
    }
  },
  "functions": {
    "api/**/*.js": {
      "maxDuration": 30
    }
  },
  "regions": ["iad1"],
  "framework": "nextjs"
}
```

---

## 🔍 **Deployment Verification**

### **Checklist**:
- [ ] Vercel CLI installed
- [ ] Logged into Vercel
- [ ] All environment variables set
- [ ] Google OAuth configured
- [ ] NextAuth URLs correct
- [ ] Build successful
- [ ] Deployment complete

### **Test URLs**:
- **Main App**: `https://your-app-name.vercel.app`
- **Auth API**: `https://your-app-name.vercel.app/api/auth/signin`
- **Health Check**: `https://your-app-name.vercel.app/api/health`

---

## 🚨 **Troubleshooting**

### **Common Issues**:

#### **1. OAuth Callback Error**:
```
Error: redirect_uri_mismatch
```
**Solution**: Make sure the redirect URI in Google Console matches your Vercel URL

#### **2. NextAuth Secret Error**:
```
Error: NEXTAUTH_SECRET is not set
```
**Solution**: Add NEXTAUTH_SECRET to Vercel environment variables

#### **3. Build Error**:
```
Error: Module not found
```
**Solution**: Check package.json and run `npm install`

#### **4. Environment Variables Not Working**:
```
Error: process.env.VARIABLE is undefined
```
**Solution**: Restart Vercel deployment after adding environment variables

---

## 📊 **Monitoring & Analytics**

### **Built-in Monitoring**:
- **Vercel Analytics**: Page views and performance
- **Vercel Logs**: Application logs
- **Error Tracking**: Automatic error capture

### **External Monitoring**:
- **Sentry**: Error tracking (if configured)
- **Vercel Speed Insights**: Performance monitoring
- **Vercel Analytics**: User behavior tracking

---

## 🔄 **Continuous Deployment**

### **Automatic Deployment**:
- Push to `main` branch → Auto-deploy to production
- Push to other branches → Preview deployments
- Environment-specific deployments

### **Deployment Hooks**:
- **Build Hook**: Trigger build manually
- **GitHub Integration**: Automatic deployment on push

---

## 🎉 **Success!**

Your NovagenAI application is now deployed on Vercel with:

✅ **NextAuth Authentication**: Google OAuth integration
✅ **Environment Variables**: Secure configuration
✅ **Custom Domain**: (if configured)
✅ **SSL Certificate**: Automatic HTTPS
✅ **Global CDN**: Fast content delivery
✅ **Automatic Scaling**: Handle traffic spikes
✅ **Preview Deployments**: Test changes before production

**🌐 Your app is live at**: `https://your-app-name.vercel.app`

---

## 📞 **Support**

For deployment issues:
- **Vercel Docs**: https://vercel.com/docs
- **NextAuth Docs**: https://next-auth.js.org/
- **Vercel Status**: https://www.vercel-status.com/

The NovagenAI platform is now live and ready for users! 🚀
