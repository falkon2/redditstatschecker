'use client';

import { UserProfile } from '../page_oauth';

interface ProfileStatsProps {
  userProfile: UserProfile;
}

export function ProfileStats({ userProfile }: ProfileStatsProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Welcome, u/{userProfile.username}!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Redditor since {userProfile.account_created}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Karma */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Total Karma</p>
              <p className="text-3xl font-bold">{formatNumber(userProfile.total_karma)}</p>
            </div>
            <div className="text-4xl opacity-80">⭐</div>
          </div>
        </div>

        {/* Link Karma */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Link Karma</p>
              <p className="text-3xl font-bold">{formatNumber(userProfile.link_karma)}</p>
            </div>
            <div className="text-4xl opacity-80">🔗</div>
          </div>
        </div>

        {/* Comment Karma */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Comment Karma</p>
              <p className="text-3xl font-bold">{formatNumber(userProfile.comment_karma)}</p>
            </div>
            <div className="text-4xl opacity-80">💬</div>
          </div>
        </div>

        {/* Account Age */}
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Account Age</p>
              <p className="text-3xl font-bold">{userProfile.account_created}</p>
            </div>
            <div className="text-4xl opacity-80">📅</div>
          </div>
        </div>
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Posts */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Posts</h3>
            <span className="text-2xl">📝</span>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
              {formatNumber(userProfile.total_posts)}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Total posts submitted
            </p>
          </div>
        </div>

        {/* Comments */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Comments</h3>
            <span className="text-2xl">💭</span>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-teal-600 dark:text-teal-400 mb-2">
              {formatNumber(userProfile.total_comments)}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Total comments made
            </p>
          </div>
        </div>
      </div>

      {/* Karma Breakdown */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Karma Breakdown
        </h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${userProfile.total_karma > 0 ? (userProfile.link_karma / userProfile.total_karma) * 100 : 0}%`
                }}
              ></div>
            </div>
            <span className="ml-3 text-sm font-medium text-gray-600 dark:text-gray-400 min-w-[100px]">
              Link: {formatNumber(userProfile.link_karma)}
            </span>
          </div>
          
          <div className="flex items-center">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${userProfile.total_karma > 0 ? (userProfile.comment_karma / userProfile.total_karma) * 100 : 0}%`
                }}
              ></div>
            </div>
            <span className="ml-3 text-sm font-medium text-gray-600 dark:text-gray-400 min-w-[100px]">
              Comment: {formatNumber(userProfile.comment_karma)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
