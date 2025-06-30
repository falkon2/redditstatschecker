'use client';

import { useState } from 'react';
import { CredentialsForm } from './components/CredentialsForm';
import { UserStats } from './components/UserStats';
import { PostsList } from './components/PostsList';
import { CommentsList } from './components/CommentsList';

export interface RedditCredentials {
  client_id: string;
  client_secret: string;
  user_agent: string;
  username: string;
  password: string;
}

export interface UserStatsData {
  username: string;
  account_created: string;
  link_karma: number;
  comment_karma: number;
  total_karma: number;
  total_posts: number;
  total_comments: number;
}

export interface Post {
  title: string;
  subreddit: string;
  score: number;
  ups: number;
  downs: number;
  num_comments: number;
  created_utc: number;
  created_time: string;
  permalink: string;
  url: string;
  selftext?: string;
  content_preview?: string;
}

export interface Comment {
  subreddit: string;
  post_title: string;
  score: number;
  created_utc: number;
  created_time: string;
  body: string;
  comment_preview: string;
  permalink: string;
  url: string;
}

export default function Home() {
  const [credentials, setCredentials] = useState<RedditCredentials | null>(null);
  const [activeTab, setActiveTab] = useState<'stats' | 'posts' | 'comments'>('stats');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Reddit Stats Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            View your Reddit posts, comments, and statistics
          </p>
        </div>

        {/* Credentials Form */}
        {!credentials && (
          <div className="max-w-2xl mx-auto mb-8">
            <CredentialsForm onCredentialsSubmit={setCredentials} />
          </div>
        )}

        {/* Main Dashboard */}
        {credentials && (
          <div className="space-y-6">
            {/* Navigation Tabs */}
            <div className="flex justify-center">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-lg">
                <button
                  onClick={() => setActiveTab('stats')}
                  className={`px-6 py-2 rounded-md font-medium transition-colors ${
                    activeTab === 'stats'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Statistics
                </button>
                <button
                  onClick={() => setActiveTab('posts')}
                  className={`px-6 py-2 rounded-md font-medium transition-colors ${
                    activeTab === 'posts'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Posts
                </button>
                <button
                  onClick={() => setActiveTab('comments')}
                  className={`px-6 py-2 rounded-md font-medium transition-colors ${
                    activeTab === 'comments'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Comments
                </button>
              </div>
            </div>

            {/* Reset Credentials Button */}
            <div className="text-center">
              <button
                onClick={() => setCredentials(null)}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline"
              >
                Change Credentials
              </button>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto">
              {activeTab === 'stats' && <UserStats credentials={credentials} />}
              {activeTab === 'posts' && <PostsList credentials={credentials} />}
              {activeTab === 'comments' && <CommentsList credentials={credentials} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
