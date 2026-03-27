import { NextRequest, NextResponse } from 'next/server';

const POLLINATIONS_API = 'https://gen.pollinations.ai';

async function generateImage(prompt: string): Promise<string> {
  try {
    const apiKey = process.env.POLLINATIONS_API_KEY;
    if (!apiKey) {
      throw new Error('POLLINATIONS_API_KEY not configured');
    }

    const imagePrompt = `A beautiful, professional social media post image for: ${prompt}. High quality, optimized for Instagram/Twitter, eye-catching, modern design.`;
    const encodedPrompt = encodeURIComponent(imagePrompt);

    // Fetch image from Pollinations (SECURE: API key stays on backend)
    const imageUrl = `https://gen.pollinations.ai/image/${encodedPrompt}?model=flux&key=${apiKey}`;

    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to generate image: ${response.status}`);
    }

    // Convert image to base64
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');

    // Return as data URL (no API key exposed)
    return `data:image/jpeg;base64,${base64}`;
  } catch (error) {
    console.error('Image generation error:', error);
    throw error;
  }
}

async function generateCaption(topic: string): Promise<string> {
  try {
    const apiKey = process.env.POLLINATIONS_API_KEY;
    if (!apiKey) {
      return `Check out this amazing content about: ${topic}`;
    }

    const response = await fetch(`${POLLINATIONS_API}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'openai',
        messages: [
          {
            role: 'user',
            content: `Write a catchy, engaging social media caption (max 200 chars) for: "${topic}". Just the caption, no quotes.`,
          },
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('Caption API error');
    }

    const data = await response.json();
    const caption = data.choices?.[0]?.message?.content?.trim() || `Check out this post about: ${topic}`;
    return caption;
  } catch (error) {
    console.error('Caption generation error:', error);
    return `Check out this amazing content about: ${topic}`;
  }
}

async function generateHashtags(topic: string): Promise<string> {
  try {
    const apiKey = process.env.POLLINATIONS_API_KEY;
    if (!apiKey) {
      return '#socialmedia #content #amazing #trending';
    }

    const response = await fetch(`${POLLINATIONS_API}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'openai',
        messages: [
          {
            role: 'user',
            content: `Generate 10-12 relevant hashtags for "${topic}". Just hashtags separated by spaces, no explanations.`,
          },
        ],
        max_tokens: 100,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('Hashtags API error');
    }

    const data = await response.json();
    const hashtags = data.choices?.[0]?.message?.content?.trim() || '#socialmedia #content #amazing #trending';
    return hashtags;
  } catch (error) {
    console.error('Hashtags generation error:', error);
    return '#socialmedia #content #amazing #trending';
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Generate all components in parallel
    const [imageUrl, caption, hashtags] = await Promise.all([
      generateImage(prompt),
      generateCaption(prompt),
      generateHashtags(prompt),
    ]);

    return NextResponse.json({
      imageUrl,
      caption,
      hashtags,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate post' },
      { status: 500 }
    );
  }
}
