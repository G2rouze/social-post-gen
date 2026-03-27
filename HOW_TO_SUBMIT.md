# How to Submit This App to Pollinations

Follow these steps to submit the Social Media Post Generator to the Pollinations app registry.

## Step 1: Prepare Your GitHub Repository

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "feat: Initial commit - Social Media Post Generator using Pollinations API"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/social-post-generator.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel or Another Platform

Before submitting, your app should be live:

**Deploy to Vercel:**
```bash
npm install -g vercel
vercel
```

Note the live URL (e.g., `https://social-post-gen.vercel.app`)

## Step 3: Create a Submission Issue on Pollinations GitHub

1. Go to: https://github.com/pollinations/pollinations/issues
2. Click "New issue"
3. Select "General" or look for an "App Submission" template
4. Use the title format: `[App Submission] Social Media Post Generator`

## Step 4: Fill in the Issue Template

Copy and paste this content into the issue (or use SUBMISSION_TEMPLATE.md):

```markdown
# [App Submission] Social Media Post Generator

## Description
A beautiful, AI-powered web application that generates social media posts with custom images, captions, and hashtags using Pollinations.ai.

## Key Features
- 🎨 AI-Generated Images (Flux model)
- ✍️ Smart Caption Generation (Llama 2)
- #️⃣ Hashtag Suggestions
- 📱 Mobile Responsive Design
- 💾 Local Storage for History
- 📋 Copy & Download Functionality

## Live Demo
https://social-post-gen.vercel.app

## GitHub Repository
https://github.com/YOUR_USERNAME/social-post-generator

## Technologies Used
- Next.js 15 + React 19 + TypeScript
- Tailwind CSS
- Pollinations.ai API (Flux + Llama 2)

## How It Works
1. User describes desired post content
2. App generates image via Flux
3. App generates caption via Llama 2
4. App generates hashtags via Llama 2
5. User can copy or download

## Why This App Matters
- Solves real problem (content creation is time-consuming)
- Fully functional on free Pollinations tier
- Shows best practices for API usage
- Production-ready code
- Useful for creators and businesses

## Installation
```bash
git clone https://github.com/YOUR_USERNAME/social-post-generator.git
npm install
npm run dev
```

## Deployment
Deploy to Vercel, Netlify, or your preferred platform. See DEPLOYMENT.md for details.

## API Usage
- Image Generation: `/image/{prompt}` endpoint
- Text Generation: `/v1/chat/completions` endpoint
- Uses free tier (no authentication required)
- No rate limiting issues

## Screenshots
[Optional: Add screenshots if possible]

## Contact
- GitHub: @YOUR_USERNAME
- Issues: GitHub Issues
```

## Step 5: Add Labels

When creating the issue, add labels:
- `app-submission` (if available)
- `ai-app`
- `generator`

## Step 6: Monitor and Respond

Pollinations team may ask questions:
- Be responsive
- Provide additional information if requested
- Share any updates or improvements

## Step 7: After Approval

Once your app is approved:

1. Open another issue requesting Flower tier upgrade:
```markdown
[Request for Tier Upgrade] Social Media Post Generator

I have successfully published and deployed the Social Media Post Generator app (https://github.com/YOUR_USERNAME/social-post-generator), which is now live at https://social-post-gen.vercel.app.

The app uses Pollinations.ai APIs for:
- Image generation (Flux)
- Text generation (Llama 2)

I'm requesting an upgrade to the Flower tier to support increased usage.

Issue: [link to app submission issue]
```

2. Your account will be upgraded automatically (usually within 24-48 hours)

## Checklist

Before submitting, verify:

- [ ] GitHub repository is public
- [ ] App is deployed and live
- [ ] Live demo link works
- [ ] README.md is comprehensive
- [ ] DEPLOYMENT.md has clear instructions
- [ ] Code is well-commented
- [ ] No sensitive data in code
- [ ] App works on mobile
- [ ] Images load correctly
- [ ] Copy functionality works
- [ ] No console errors
- [ ] Uses free tier Pollinations API

## Troubleshooting

**Issue: App doesn't appear in registry immediately**
- This is normal, takes 24-48 hours to appear

**Issue: Images not loading in deployed app**
- Verify CORS is not blocking Pollinations API
- Check browser console for errors
- Confirm Pollinations API is accessible from your server

**Issue: Slow generation**
- Image/text generation takes 5-10 seconds
- This is expected due to API response time

## Expected Timeline

1. **Day 0**: Submit issue
2. **Day 1-2**: Pollinations team reviews
3. **Day 2-3**: Approval or feedback
4. **Day 3-4**: Tier upgrade (if requested)

## Support

If you have questions:
- Comment on the GitHub issue
- Check Pollinations docs: https://enter.pollinations.ai/api/docs
- Ask on Pollinations Discord (if available)

---

**Good luck! Your app is ready to ship! 🚀**
