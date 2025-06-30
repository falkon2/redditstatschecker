'use client';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        {/* Reddit Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 11.852c-.398 0-.771.158-1.047.435-.277.277-.434.65-.434 1.047 0 .398.157.771.434 1.047.276.277.649.435 1.047.435.398 0 .771-.158 1.047-.435.277-.276.435-.649.435-1.047 0-.397-.158-.77-.435-1.047-.276-.277-.649-.435-1.047-.435zm-11.136 0c-.398 0-.771.158-1.047.435-.277.277-.435.65-.435 1.047 0 .398.158.771.435 1.047.276.277.649.435 1.047.435.398 0 .771-.158 1.047-.435.277-.276.435-.649.435-1.047 0-.397-.158-.77-.435-1.047-.276-.277-.649-.435-1.047-.435z"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Reddit Stats
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Analyze your Reddit activity securely
          </p>
        </div>

        {/* Login Button */}
        <button
          onClick={onLogin}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-3"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 11.852c-.398 0-.771.158-1.047.435-.277.277-.434.65-.434 1.047 0 .398.157.771.434 1.047.276.277.649.435 1.047.435.398 0 .771-.158 1.047-.435.277-.276.435-.649.435-1.047 0-.397-.158-.77-.435-1.047-.276-.277-.649-.435-1.047-.435zm-11.136 0c-.398 0-.771.158-1.047.435-.277.277-.435.65-.435 1.047 0 .398.158.771.435 1.047.276.277.649.435 1.047.435.398 0 .771-.158 1.047-.435.277-.276.435-.649.435-1.047 0-.397-.158-.77-.435-1.047-.276-.277-.649-.435-1.047-.435z"/>
          </svg>
          <span>Login with Reddit</span>
        </button>

        {/* Security Information */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Secure OAuth2 Login
          </h3>
          <ul className="text-xs text-blue-600 dark:text-blue-300 space-y-1">
            <li>• You&apos;ll be redirected to Reddit&apos;s secure login page</li>
            <li>• Your password is never shared with this app</li>
            <li>• Only temporary access to view your stats</li>
            <li>• No data is stored permanently</li>
          </ul>
        </div>

        {/* Features */}
        <div className="mt-6 space-y-3">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            What you&apos;ll see:
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <span>📊</span>
              <span>Karma stats</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <span>📝</span>
              <span>Recent posts</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <span>💬</span>
              <span>Comments</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <span>📈</span>
              <span>Activity trends</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
