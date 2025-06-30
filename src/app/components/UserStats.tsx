'use client';

import { useState, useEffect } from 'react';
import { RedditCredentials, UserStatsData } from '../page';

interface UserStatsProps {
  credentials: RedditCredentials;
}

export function UserStats({ credentials }: UserStatsProps) {
  const [stats, setStats] = useState<UserStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, [credentials]);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/api/user/stats/with-credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-2">❌ Error</div>
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={fetchStats}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="text-center text-gray-500 dark:text-gray-400">
          No stats available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        📊 User Statistics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Username Card */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Username</p>
              <p className="text-xl font-bold text-blue-800 dark:text-blue-200">
                u/{stats.username}
              </p>
            </div>
            <div className="text-2xl">👤</div>
          </div>
        </div>

        {/* Account Age Card */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 dark:text-green-400 font-medium">Account Created</p>
              <p className="text-xl font-bold text-green-800 dark:text-green-200">
                {stats.account_created}
              </p>
            </div>
            <div className="text-2xl">📅</div>
          </div>
        </div>

        {/* Total Karma Card */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">Total Karma</p>
              <p className="text-xl font-bold text-purple-800 dark:text-purple-200">
                {stats.total_karma.toLocaleString()}
              </p>
            </div>
            <div className="text-2xl">⭐</div>
          </div>
        </div>

        {/* Link Karma Card */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">Link Karma</p>
              <p className="text-xl font-bold text-orange-800 dark:text-orange-200">
                {stats.link_karma.toLocaleString()}
              </p>
            </div>
            <div className="text-2xl">🔗</div>
          </div>
        </div>

        {/* Comment Karma Card */}
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">Comment Karma</p>
              <p className="text-xl font-bold text-indigo-800 dark:text-indigo-200">
                {stats.comment_karma.toLocaleString()}
              </p>
            </div>
            <div className="text-2xl">💬</div>
          </div>
        </div>

        {/* Total Posts Card */}
        <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-pink-600 dark:text-pink-400 font-medium">Total Posts</p>
              <p className="text-xl font-bold text-pink-800 dark:text-pink-200">
                {stats.total_posts.toLocaleString()}
              </p>
            </div>
            <div className="text-2xl">📝</div>
          </div>
        </div>

        {/* Total Comments Card */}
        <div className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 p-4 rounded-lg col-span-1 md:col-span-2 lg:col-span-3">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm text-teal-600 dark:text-teal-400 font-medium">Total Comments</p>
              <p className="text-3xl font-bold text-teal-800 dark:text-teal-200">
                {stats.total_comments.toLocaleString()}
              </p>
            </div>
            <div className="text-3xl ml-4">💭</div>
          </div>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="mt-6 text-center">
        <button
          onClick={fetchStats}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          🔄 Refresh Stats
        </button>
      </div>
    </div>
  );
}
