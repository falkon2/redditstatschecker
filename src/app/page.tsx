'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

interface UserProfile {
  username: string;
  total_karma: number;
  link_karma: number;
  comment_karma: number;
  account_created: string;
  total_posts: number;
  total_comments: number;
}

function HomePage() {
  const searchParams = useSearchParams();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://servicebackendrender.onrender.com';

  useEffect(() => {
    const sessionId = searchParams.get('session');
    const errorParam = searchParams.get('error');

    if (errorParam) {
      setError(`Authentication failed: ${errorParam}`);
      return;
    }

    if (sessionId) {
      setIsAuthenticated(true);
      fetchProfile(sessionId);
    }
  }, [searchParams]);

  const fetchProfile = async (sessionId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/api/profile?session_id=${sessionId}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch profile: ${response.status}`);
      }
      
      const profileData = await response.json();
      setProfile(profileData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const initiateLogin = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/auth/login`);
      
      if (!response.ok) {
        throw new Error('Failed to initiate login');
      }
      
      const { auth_url } = await response.json();
      window.location.href = auth_url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initiate login');
      setLoading(false);
    }
  };

  const LoadingComponent = () => (
    <div className="flex items-center justify-center space-x-2">
      <div className="loading-bars">
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
      </div>
      <span className="text-cyber-primary ml-4 terminal-text">SCANNING NEURAL PATHWAYS...</span>
    </div>
  );

  return (
    <div className="min-h-screen relative">
      {/* Cyberpunk Grid Background */}
      <div className="cyber-grid"></div>
      
      {/* Main Container */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="glitch text-6xl md:text-8xl mb-4 font-bold" data-text="REDDIT NEURAL INTERFACE">
            REDDIT NEURAL INTERFACE
          </h1>
          <p className="text-cyber-dim text-lg md:text-xl font-mono">
            &gt; ACCESSING DIGITAL FOOTPRINT DATABASE...
          </p>
          <div className="mt-4 text-cyber-accent terminal-text">
            [SYSTEM STATUS: ONLINE] [ENCRYPTION: ACTIVE] [CONNECTION: SECURE]
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto">
          {!isAuthenticated && !loading && (
            <div className="text-center">
              <div className="cyber-card p-8 mb-8">
                <h2 className="text-3xl font-bold text-cyber-primary mb-6 font-mono">
                  NEURAL LINK REQUIRED
                </h2>
                <p className="text-cyber-text mb-8 text-lg">
                  Establish secure connection to Reddit mainframe to access your digital persona metrics.
                </p>
                <button 
                  onClick={initiateLogin}
                  className="cyber-btn text-lg px-8 py-4"
                  disabled={loading}
                >
                  INITIATE NEURAL HANDSHAKE
                </button>
              </div>
              
              {/* Terminal Info */}
              <div className="cyber-card p-6 text-left">
                <div className="terminal-text text-sm space-y-2">
                  <div>&gt; reddit_stats --version 2.0.0</div>
                  <div>&gt; security_protocol: OAuth2.0_Authorization_Code_Flow</div>
                  <div>&gt; encryption: AES-256</div>
                  <div>&gt; data_access: READ_ONLY</div>
                  <div>&gt; privacy_mode: MAXIMUM</div>
                  <div className="text-cyber-warning">&gt; warning: credentials never stored locally</div>
                </div>
              </div>
            </div>
          )}

          {loading && (
            <div className="cyber-card p-12 text-center">
              <LoadingComponent />
            </div>
          )}

          {error && (
            <div className="cyber-card p-6 border-cyber-danger bg-red-900/20">
              <div className="text-cyber-danger font-mono">
                <div className="text-lg font-bold mb-2">[ERROR] NEURAL LINK FAILED</div>
                <div>{error}</div>
              </div>
            </div>
          )}

          {profile && (
            <div className="space-y-6">
              {/* User Header */}
              <div className="cyber-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-cyber-primary font-mono">
                    USER PROFILE: {profile.username}
                  </h2>
                  <div className="text-cyber-accent text-sm">
                    SINCE: {profile.account_created}
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="cyber-card p-6 text-center">
                  <div className="text-3xl font-bold text-cyber-primary neon-glow mb-2">
                    {profile.total_karma.toLocaleString()}
                  </div>
                  <div className="text-cyber-dim font-mono">TOTAL KARMA</div>
                </div>
                
                <div className="cyber-card p-6 text-center">
                  <div className="text-3xl font-bold text-cyber-accent neon-glow mb-2">
                    {profile.total_posts.toLocaleString()}
                  </div>
                  <div className="text-cyber-dim font-mono">TOTAL POSTS</div>
                </div>
                
                <div className="cyber-card p-6 text-center">
                  <div className="text-3xl font-bold text-cyber-secondary neon-glow mb-2">
                    {profile.total_comments.toLocaleString()}
                  </div>
                  <div className="text-cyber-dim font-mono">TOTAL COMMENTS</div>
                </div>
                
                <div className="cyber-card p-6 text-center">
                  <div className="text-3xl font-bold text-cyber-warning neon-glow mb-2">
                    {((profile.total_comments / (profile.total_posts || 1))).toFixed(1)}
                  </div>
                  <div className="text-cyber-dim font-mono">COMMENTS/POST</div>
                </div>
              </div>

              {/* Detailed Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="cyber-card p-6">
                  <h3 className="text-xl font-bold text-cyber-primary mb-4 font-mono">
                    KARMA BREAKDOWN
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-cyber-dim">Link Karma:</span>
                      <span className="text-cyber-accent font-mono">{profile.link_karma.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyber-dim">Comment Karma:</span>
                      <span className="text-cyber-secondary font-mono">{profile.comment_karma.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="cyber-card p-6">
                  <h3 className="text-xl font-bold text-cyber-primary mb-4 font-mono">
                    ACTIVITY METRICS
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-cyber-dim">Avg Karma/Post:</span>
                      <span className="text-cyber-accent font-mono">
                        {profile.total_posts > 0 ? (profile.link_karma / profile.total_posts).toFixed(1) : '0'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyber-dim">Avg Karma/Comment:</span>
                      <span className="text-cyber-secondary font-mono">
                        {profile.total_comments > 0 ? (profile.comment_karma / profile.total_comments).toFixed(1) : '0'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terminal Output */}
              <div className="cyber-card p-6">
                <div className="terminal-text text-sm space-y-1">
                  <div>&gt; neural_scan_complete</div>
                  <div>&gt; user_profile_loaded: {profile.username}</div>
                  <div>&gt; total_data_points: {(profile.total_posts + profile.total_comments).toLocaleString()}</div>
                  <div>&gt; karma_efficiency: {(profile.total_karma / (profile.total_posts + profile.total_comments) || 0).toFixed(2)}</div>
                  <div className="text-cyber-primary">&gt; status: ANALYSIS_COMPLETE</div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="text-center mt-16 text-cyber-dim text-sm font-mono">
          <div className="cyber-card p-4">
            REDDIT NEURAL INTERFACE v2.0.0 | SECURE OAUTH2 PROTOCOL | NO DATA STORED
          </div>
        </footer>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-bars">
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
        </div>
      </div>
    }>
      <HomePage />
    </Suspense>
  );
}
