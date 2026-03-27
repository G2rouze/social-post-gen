# ✨ Social Media Post Generator

A beautiful, AI-powered web application that generates social media posts with custom images, captions, and hashtags in seconds using Pollinations.ai.

## Features

- 🎨 **AI-Generated Images** - Creates stunning, professional images using Flux model
- ✍️ **Smart Captions** - Generates engaging, platform-optimized captions
- #️⃣ **Hashtag Generation** - Produces relevant hashtags for maximum reach
- 📱 **Mobile Responsive** - Beautiful design that works on all devices
- 💾 **Local Storage** - Save your recent posts locally (up to 10 posts)
- 📋 **One-Click Copy** - Easy copy to clipboard for all content
- ⬇️ **Image Download** - Download generated images directly

## Tech Stack

- **Frontend**: Next.js 15 + React 19 + TypeScript
- **Styling**: Tailwind CSS
- **AI**: Pollinations.ai API (free tier)
  - Image Generation: Flux
  - Text Generation: Llama 2
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/social-post-generator.git
cd social-post-generator
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Enter Your Topic**: Describe what you want your post to be about
2. **Click Generate**: The AI will create an image, caption, and hashtags
3. **Customize & Share**: Copy content or download the image
4. **Browse History**: Your last 10 posts are saved locally

## Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repository directly to Vercel for automatic deployments.

### Docker

```bash
docker build -t social-post-gen .
docker run -p 3000:3000 social-post-gen
```

## API Details

Uses the free Pollinations.ai API:
- **Image Generation**: Flux model
- **Text Generation**: Llama 2 7B
- **No authentication required** for free tier

## License

MIT License - feel free to use for personal or commercial purposes.

## Credits

- Built with [Next.js](https://nextjs.org/)
- Powered by [Pollinations.ai](https://pollinations.ai)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

**Made with ❤️ using Pollinations.ai API**
