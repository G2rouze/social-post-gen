'use client';

import { useState, useRef, useEffect } from 'react';

interface Post {
  id: string;
  prompt: string;
  caption: string;
  hashtags: string;
  imageUrl: string;
  timestamp: Date;
}

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [history, setHistory] = useState<Post[]>([]);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('posts');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setHistory(parsed.map((p: any) => ({ ...p, timestamp: new Date(p.timestamp) })));
      } catch (e) {
        console.error('Failed to load history:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('posts', JSON.stringify(history));
    }
  }, [history]);

  const generatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate post');
      }

      const data = await response.json();
      const newPost: Post = {
        id: Date.now().toString(),
        prompt,
        caption: data.caption,
        hashtags: data.hashtags,
        imageUrl: data.imageUrl,
        timestamp: new Date(),
      };

      setCurrentPost(newPost);
      setHistory([newPost, ...history.slice(0, 9)]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadPost = async () => {
    if (!currentPost?.imageUrl) return;
    try {
      const response = await fetch(currentPost.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `post-${currentPost.id}.png`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-indigo-600">✨ Social Post Generator</h1>
          <p className="text-gray-600 text-sm mt-1">Create AI-powered social media content in seconds</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Generator */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <form onSubmit={generatePost} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What's your post about?
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., 'A beautiful sunset at the beach, golden hour, peaceful vibes'"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-gray-900"
                    rows={4}
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !prompt.trim()}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {loading ? 'Generating...' : 'Generate Post'}
                </button>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}
              </form>

              {/* Current Post */}
              {currentPost && (
                <div className="mt-8 border-t pt-8">
                  <div className="space-y-4">
                    {/* Image */}
                    <div className="rounded-lg overflow-hidden bg-gray-100 h-80">
                      <img
                        src={currentPost.imageUrl}
                        alt="Generated"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder.png';
                        }}
                      />
                    </div>

                    {/* Caption */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Caption
                      </label>
                      <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 relative group">
                        <p className="text-gray-800 whitespace-pre-wrap">{currentPost.caption}</p>
                        <button
                          onClick={() => copyToClipboard(currentPost.caption)}
                          className="absolute top-2 right-2 bg-white border border-gray-300 rounded px-2 py-1 text-xs font-medium text-gray-600 opacity-0 group-hover:opacity-100 transition"
                        >
                          {copied ? '✓ Copied' : 'Copy'}
                        </button>
                      </div>
                    </div>

                    {/* Hashtags */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hashtags
                      </label>
                      <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 relative group">
                        <p className="text-gray-800">{currentPost.hashtags}</p>
                        <button
                          onClick={() => copyToClipboard(currentPost.hashtags)}
                          className="absolute top-2 right-2 bg-white border border-gray-300 rounded px-2 py-1 text-xs font-medium text-gray-600 opacity-0 group-hover:opacity-100 transition"
                        >
                          {copied ? '✓ Copied' : 'Copy'}
                        </button>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-4">
                      <button
                        onClick={() => copyToClipboard(`${currentPost.caption}\n\n${currentPost.hashtags}`)}
                        className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg font-medium hover:bg-blue-200 transition"
                      >
                        📋 Copy All
                      </button>
                      <button
                        onClick={downloadPost}
                        className="flex-1 bg-green-100 text-green-700 py-2 rounded-lg font-medium hover:bg-green-200 transition"
                      >
                        ⬇️ Download
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* History Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Posts</h2>

              {history.length === 0 ? (
                <p className="text-gray-500 text-sm">No posts generated yet. Create one to get started!</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {history.map((post) => (
                    <button
                      key={post.id}
                      onClick={() => setCurrentPost(post)}
                      className={`w-full text-left p-3 rounded-lg border-2 transition ${
                        currentPost?.id === post.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <p className="text-xs text-gray-500 mb-1">
                        {new Date(post.timestamp).toLocaleDateString()}
                      </p>
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">{post.prompt}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 text-center text-gray-600 text-sm">
          <p>Powered by <a href="https://pollinations.ai" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-medium hover:underline">Pollinations.ai</a></p>
        </div>
      </footer>
    </div>
  );
}
