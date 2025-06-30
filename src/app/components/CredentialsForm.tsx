'use client';

import { useState } from 'react';
import { RedditCredentials } from '../page';

interface CredentialsFormProps {
  onCredentialsSubmit: (credentials: RedditCredentials) => void;
}

export function CredentialsForm({ onCredentialsSubmit }: CredentialsFormProps) {
  const [formData, setFormData] = useState<RedditCredentials>({
    client_id: 'vcgVYwv4uhjpgUuISqZ0Xg',
    client_secret: 'OYYMPY6goHJEwWN2-EyA3GwNeDWGzQ',
    user_agent: 'RedditStatsWebsite/1.0 by YourUsername',
    username: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCredentialsSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Reddit API Credentials
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Enter your Reddit credentials to access your account data
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="client_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Client ID
          </label>
          <input
            type="text"
            id="client_id"
            name="client_id"
            value={formData.client_id}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
            readOnly
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Pre-filled with provided client ID
          </p>
        </div>

        <div>
          <label htmlFor="client_secret" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Client Secret
          </label>
          <input
            type="password"
            id="client_secret"
            name="client_secret"
            value={formData.client_secret}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
            readOnly
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Pre-filled with provided client secret
          </p>
        </div>

        <div>
          <label htmlFor="user_agent" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            User Agent
          </label>
          <input
            type="text"
            id="user_agent"
            name="user_agent"
            value={formData.user_agent}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Should be in format: AppName/Version by Username
          </p>
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Reddit Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
            placeholder="Enter your Reddit username"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Reddit Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white pr-10"
              required
              placeholder="Enter your Reddit password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
            🔒 Privacy Notice
          </h3>
          <p className="text-xs text-blue-600 dark:text-blue-300">
            Your credentials are only used to connect to Reddit&apos;s API and are not stored or transmitted to any other servers.
            All communication happens directly between your browser and Reddit&apos;s servers.
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Connect to Reddit
        </button>
      </form>
    </div>
  );
}
