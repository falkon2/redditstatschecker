'use client';

import { useState } from 'react';
import { UserProfile, Post, Comment } from '../page_oauth';
import { ProfileStats } from './ProfileStats';
import { PostsSection } from './PostsSection';
import { CommentsSection } from './CommentsSection';

interface DashboardProps {
  userProfile: UserProfile;
  sessionId: string;
  onLogout: () => void;
}

type TabType = 'stats' | 'posts' | 'comments';

export function Dashboard({ userProfile, sessionId, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('stats');

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 11.852c-.398 0-.771.158-1.047.435-.277.277-.434.65-.434 1.047 0 .398.157.771.434 1.047.276.277.649.435 1.047.435.398 0 .771-.158 1.047-.435.277-.276.435-.649.435-1.047 0-.397-.158-.77-.435-1.047-.276-.277-.649-.435-1.047-.435zm-11.136 0c-.398 0-.771.158-1.047.435-.277.277-.435.65-.435 1.047 0 .398.158.771.435 1.047.276.277.649.435 1.047.435.398 0 .771-.158 1.047-.435.277-.276.435-.649.435-1.047 0-.397-.158-.77-.435-1.047-.276-.277-.649-.435-1.047-.435z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">Reddit Stats</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Welcome back, u/{userProfile.username}</p>
              </div>
            </div>
            
            <button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('stats')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'stats'
                  ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span>📊</span>
                <span>Statistics</span>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('posts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'posts'
                  ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span>📝</span>
                <span>Posts</span>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('comments')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'comments'
                  ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span>💬</span>
                <span>Comments</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'stats' && <ProfileStats userProfile={userProfile} />}
        {activeTab === 'posts' && <PostsSection sessionId={sessionId} />}
        {activeTab === 'comments' && <CommentsSection sessionId={sessionId} />}
      </main>
    </div>
  );
}
