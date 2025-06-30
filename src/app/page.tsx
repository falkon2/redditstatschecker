'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Dashboard } from './components/Dashboard';
import { LoginScreen } from './components/LoginScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { ErrorScreen } from './components/ErrorScreen';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface UserProfile {
  username: string;
  total_karma: number;
  link_karma: number;
  comment_karma: number;
  account_created: string;
  total_posts: number;
  total_comments: number;
}

export interface Post {
  title: string;
  subreddit: string;
  score: number;
  num_comments: number;
  created_utc: number;
  created_time: string;
  permalink: string;
  url: string;
  selftext?: string;
}

export interface Comment {
  subreddit: string;
  post_title: string;
  score: number;
  created_utc: number;
  created_time: string;
  body: string;
  permalink: string;
}

export default function Home() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check for existing session in localStorage
    const savedSessionId = localStorage.getItem('reddit_session_id');
    if (savedSessionId) {
      setSessionId(savedSessionId);
      fetchUserProfile(savedSessionId);
    } else {
      setLoading(false);
    }

    // Handle OAuth2 callback
    const session = searchParams.get('session');
    const authError = searchParams.get('error');

    if (session) {
      localStorage.setItem('reddit_session_id', session);
      setSessionId(session);
      fetchUserProfile(session);
      // Clean URL
      router.replace('/');
    } else if (authError) {
      setError(`Authentication failed: ${authError}`);
      setLoading(false);
    }
  }, [searchParams, router]);

  const fetchUserProfile = async (sessionId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/profile?session_id=${sessionId}`);
      
      if (!response.ok) {
        if (response.status === 401) {
          // Session expired, clear it
          localStorage.removeItem('reddit_session_id');
          setSessionId(null);
          setLoading(false);
          return;
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const profile = await response.json();
      setUserProfile(profile);
    } catch (err) {
      console.error('Failed to fetch user profile:', err);
      setError('Failed to load user profile. Please try logging in again.');
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
        throw new Error('Failed to initiate login');
      }

      const { auth_url } = await response.json();
      window.location.href = auth_url;
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to start login process. Please try again.');
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (!sessionId) return;

    try {
      await fetch(`${API_BASE_URL}/auth/logout?session_id=${sessionId}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('reddit_session_id');
      setSessionId(null);
      setUserProfile(null);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <ErrorScreen 
        error={error} 
        onRetry={() => {
          setError(null);
          if (sessionId) {
            fetchUserProfile(sessionId);
          }
        }}
        onBackToLogin={() => {
          setError(null);
          setSessionId(null);
          localStorage.removeItem('reddit_session_id');
        }}
      />
    );
  }

  if (!sessionId || !userProfile) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <Dashboard 
      userProfile={userProfile}
      sessionId={sessionId}
      onLogout={handleLogout}
    />
  );
}
