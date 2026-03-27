import { NextRequest, NextResponse } from 'next/server';

const POLLINATIONS_API = 'https://gen.pollinations.ai';

async function generateImage(prompt: string): Promise<string> {
  try {
    const apiKey = process.env.POLLINATIONS_API_KEY;
    const imagePrompt = `A beautiful, professional social media post image for: ${prompt}. High quality, optimized for Instagram/Twitter, eye-catching, modern design.`;
    const encodedPrompt = encodeURIComponent(imagePrompt);

    // Build image URL with API key if available
    let imageUrl = `${POLLINATIONS_API}/image/${encodedPrompt}`;
    if (apiKey) {
      imageUrl += `?key=${apiKey}`;
    }

    return imageUrl;
  } catch (error) {
    console.error('Image generation error:', error);
    throw new Error('Failed to generate image');
  }
}

async function generateCaption(topic: string): Promise<string> {
  try {
    const apiKey = process.env.POLLINATIONS_API_KEY;
    const response = await fetch(`${POLLINATIONS_API}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey && { Authorization: `Bearer ${apiKey}` }),
      },
      body: JSON.stringify({
        model: 'meta-llama/Llama-2-7b-chat-hf',
        messages: [
          {
            role: 'user',
            content: `Write a catchy, engaging social media caption for this topic (keep it under 200 characters): "${topic}".
The caption should be:
- Engaging and relatable
- Include a call-to-action or question
- Appropriate for Instagram/Twitter
- Friendly and conversational tone
Just write the caption, no quotes or extra text.`,
          },
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('Caption generation failed');
    }

    const data = await response.json();
    const caption = data.choices[0]?.message?.content?.trim() || 'Check out this amazing content!';
    return caption;
  } catch (error) {
    console.error('Caption generation error:', error);
    return `Check out this post about: ${topic}`;
  }
}

async function generateHashtags(topic: string): Promise<string> {
  try {
    const apiKey = process.env.POLLINATIONS_API_KEY;
    const response = await fetch(`${POLLINATIONS_API}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey && { Authorization: `Bearer ${apiKey}` }),
      },
      body: JSON.stringify({
        model: 'meta-llama/Llama-2-7b-chat-hf',
        messages: [
          {
            role: 'user',
            content: `Generate 10-15 relevant, popular hashtags for this topic (separated by spaces): "${topic}"
Include mix of:
- Broad hashtags (#socialmedia, #content)
- Specific hashtags related to the topic
- Trending hashtags (if applicable)
Just list the hashtags, no explanations.`,
          },
        ],
        max_tokens: 100,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('Hashtags generation failed');
    }

    const data = await response.json();
    const hashtags = data.choices[0]?.message?.content?.trim() || '#socialmedia #content #amazing';
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
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
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
