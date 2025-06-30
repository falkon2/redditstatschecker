'use client';

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="text-center">
        {/* Animated Reddit Logo */}
        <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 11.852c-.398 0-.771.158-1.047.435-.277.277-.434.65-.434 1.047 0 .398.157.771.434 1.047.276.277.649.435 1.047.435.398 0 .771-.158 1.047-.435.277-.276.435-.649.435-1.047 0-.397-.158-.77-.435-1.047-.276-.277-.649-.435-1.047-.435zm-11.136 0c-.398 0-.771.158-1.047.435-.277.277-.435.65-.435 1.047 0 .398.158.771.435 1.047.276.277.649.435 1.047.435.398 0 .771-.158 1.047-.435.277-.276.435-.649.435-1.047 0-.397-.158-.77-.435-1.047-.276-.277-.649-.435-1.047-.435z"/>
          </svg>
        </div>

        {/* Loading Spinner */}
        <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>

        {/* Loading Text */}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          Loading...
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Fetching your Reddit data
        </p>

        {/* Loading Steps Animation */}
        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
