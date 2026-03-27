# Deployment Guide

## Quick Start Deployment

### Option 1: Deploy to Vercel (Recommended - 2 minutes)

**Prerequisites:**
- GitHub account
- Vercel account (free)

**Steps:**

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit: Social Media Post Generator"
git branch -M main
git remote add origin https://github.com/yourusername/social-post-generator.git
git push -u origin main
```

2. Go to https://vercel.com and sign in with GitHub

3. Click "New Project" and import your repository

4. Configure project:
   - Framework: Next.js (auto-detected)
   - Root directory: ./
   - Build command: npm run build (default)
   - Output directory: .next (default)
   - Environment variables: None required (uses free Pollinations tier)

5. Click "Deploy"

6. Your app will be live in ~2 minutes at `your-project.vercel.app`

### Option 2: Deploy to Netlify

1. Connect your GitHub repository to Netlify
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Deploy

### Option 3: Deploy to Docker

**Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

**Build and run:**
```bash
docker build -t social-post-gen .
docker run -p 3000:3000 social-post-gen
```

### Option 4: Self-hosted (VPS)

**Requirements:**
- Node.js 18+
- PM2 for process management
- Nginx/Apache for reverse proxy

**Steps:**
```bash
# SSH into your server
ssh user@your-server.com

# Clone and setup
git clone https://github.com/yourusername/social-post-generator.git
cd social-post-generator
npm install
npm run build

# Install PM2
npm install -g pm2

# Start app
pm2 start npm --name "social-post-gen" -- start

# Configure Nginx
# (Configure as reverse proxy to localhost:3000)

# Make persistent
pm2 startup
pm2 save
```

## Environment Variables

Optional (for future enhancements):

```env
# Pollinations API key (optional, uses free tier by default)
NEXT_PUBLIC_POLLINATIONS_API_KEY=your_key_here
```

## Post-Deployment Checklist

- [ ] App loads without errors
- [ ] Can generate a post successfully
- [ ] Images load properly
- [ ] Copy to clipboard works
- [ ] Download image works
- [ ] Local storage persists across sessions
- [ ] Mobile responsive design works
- [ ] No console errors

## Performance Optimization

Already included:
- ✅ Next.js Image optimization
- ✅ CSS minification (Tailwind)
- ✅ JavaScript code splitting
- ✅ API route optimization
- ✅ Local caching

## Monitoring & Logs

**Vercel:**
- Dashboard: https://vercel.com/dashboard
- View logs: Click project → Deployments → View Function Logs

**Docker:**
```bash
docker logs container_id
```

**Self-hosted (PM2):**
```bash
pm2 logs social-post-gen
pm2 monit
```

## Troubleshooting Deployment

### App shows "502 Bad Gateway"
- Check if build succeeded
- Verify Node.js version compatibility
- Check logs for errors

### Pollinations API returns 503
- Pollinations service might be temporarily down
- Wait a few minutes and try again
- App has error handling for this case

### Images not loading
- Check CORS settings
- Verify Pollinations API is accessible
- Check browser console for errors

### Slow performance
- Images are dynamically generated (takes 5-10 seconds)
- This is normal; could cache results in future version
- Consider adding loading indicator

## Updating Deployment

### Vercel (automatic)
- Just push to main branch
- Vercel automatically rebuilds and deploys

### Docker
```bash
git pull
docker build -t social-post-gen .
docker stop current_container
docker run -p 3000:3000 social-post-gen
```

### Self-hosted
```bash
cd /path/to/app
git pull
npm install
npm run build
pm2 restart social-post-gen
```

## Security Notes

- ✅ No sensitive data stored client-side
- ✅ No authentication required (public app)
- ✅ API requests go directly to Pollinations (no proxy)
- ✅ No CORS issues (Pollinations allows public access)
- ✅ Content Security Policy configured in Next.js

## Custom Domain

### Vercel
1. Go to project settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Netlify
1. Domain settings → Add domain
2. Configure DNS

### Self-hosted
1. Point A record to your server IP
2. Configure Nginx/Apache for SSL/TLS

## Summary

**Recommended:** Deploy to Vercel
- Easiest
- Fastest
- Free tier sufficient
- Automatic scaling
- Built-in monitoring

**Time to deploy:** 2-5 minutes
**Cost:** Free (Vercel free tier)
