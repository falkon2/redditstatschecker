'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://servicebackendrender.onrender.com';

interface UserProfile {
  username: string;
  total_karma: number;
  link_karma: number;
  comment_karma: number;
  account_created: string;
  total_posts: number;
  total_comments: number;
}

export default function Home() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check for existing session
    const savedSessionId = localStorage.getItem('reddit_session_id');
    if (savedSessionId) {
      setSessionId(savedSessionId);
      fetchUserProfile(savedSessionId);
    }

    // Handle OAuth2 callback
    const session = searchParams.get('session');
    const authError = searchParams.get('error');

    if (session) {
      localStorage.setItem('reddit_session_id', session);
      setSessionId(session);
      fetchUserProfile(session);
      router.replace('/');
    } else if (authError) {
      setError(`Authentication failed: ${authError}`);
    }
  }, [searchParams, router]);

  const fetchUserProfile = async (sessionId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/profile?session_id=${sessionId}`);
      
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('reddit_session_id');
          setSessionId(null);
          return;
        }
        throw new Error(`HTTP ${response.status}`);
      }

      const profile = await response.json();
      setUserProfile(profile);
    } catch (err) {
      setError('Failed to load profile');
      localStorage.removeItem('reddit_session_id');
      setSessionId(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/auth/login`);
      
      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const { auth_url } = await response.json();
      window.location.href = auth_url;
    } catch (err) {
      setError('Login failed');
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (sessionId) {
      try {
        await fetch(`${API_BASE_URL}/auth/logout?session_id=${sessionId}`, {
          method: 'DELETE'
        });
      } catch (err) {
        console.error('Logout error:', err);
      }
    }
    localStorage.removeItem('reddit_session_id');
    setSessionId(null);
    setUserProfile(null);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-xl mb-4">❌ Error</div>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null);
              setSessionId(null);
              localStorage.removeItem('reddit_session_id');
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Login screen
  if (!sessionId || !userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-100">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 mx-4">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🤖</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Reddit Stats</h1>
            <p className="text-gray-600">Secure OAuth2 Login</p>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-3"
          >
            <span>🔗</span>
            <span>Login with Reddit</span>
          </button>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-800 mb-2">🔒 Secure OAuth2</h3>
            <ul className="text-xs text-blue-600 space-y-1">
              <li>• Redirects to Reddit's secure login</li>
              <li>• No password sharing with this app</li>
              <li>• Temporary access only</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🤖</span>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Reddit Stats</h1>
              <p className="text-sm text-gray-600">u/{userProfile.username}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Stats */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Reddit Stats</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-purple-100 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">{userProfile.total_karma.toLocaleString()}</div>
              <div className="text-sm text-purple-800">Total Karma</div>
            </div>
            
            <div className="bg-blue-100 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{userProfile.link_karma.toLocaleString()}</div>
              <div className="text-sm text-blue-800">Link Karma</div>
            </div>
            
            <div className="bg-green-100 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{userProfile.comment_karma.toLocaleString()}</div>
              <div className="text-sm text-green-800">Comment Karma</div>
            </div>
            
            <div className="bg-orange-100 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-600">{userProfile.account_created}</div>
              <div className="text-sm text-orange-800">Account Created</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-indigo-100 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-indigo-600">{userProfile.total_posts.toLocaleString()}</div>
              <div className="text-sm text-indigo-800">Total Posts</div>
            </div>
            
            <div className="bg-teal-100 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-teal-600">{userProfile.total_comments.toLocaleString()}</div>
              <div className="text-sm text-teal-800">Total Comments</div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 text-sm">
            ✅ OAuth2 working! Backend: {API_BASE_URL}
          </p>
        </div>
      </main>
    </div>
  );
}
