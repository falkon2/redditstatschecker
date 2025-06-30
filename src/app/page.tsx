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
      <div className="relative z-10 container mx-auto px-6 py-12 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="floating-element">
            <h1 className="glitch text-6xl md:text-8xl mb-6 font-bold text-shadow-cyber" data-text="REDDIT NEURAL INTERFACE">
              REDDIT NEURAL INTERFACE
            </h1>
          </div>
          <p className="text-cyber-dim text-xl md:text-2xl font-mono mb-6">
            &gt; ACCESSING DIGITAL FOOTPRINT DATABASE...
          </p>
          <div className="terminal-text text-cyber-accent text-lg">
            [SYSTEM STATUS: ONLINE] [ENCRYPTION: ACTIVE] [CONNECTION: SECURE]
          </div>
          <div className="section-divider"></div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto">
          {!isAuthenticated && !loading && (
            <div className="text-center space-y-8">
              <div className="cyber-card max-w-2xl mx-auto">
                <h2 className="text-4xl font-bold text-cyber-primary mb-8 font-mono text-shadow-cyber">
                  NEURAL LINK REQUIRED
                </h2>
                <p className="text-cyber-text mb-12 text-xl leading-relaxed">
                  Establish secure connection to Reddit mainframe to access your digital persona metrics.
                  Prepare for neural interface initialization.
                </p>
                <button 
                  onClick={initiateLogin}
                  className="cyber-btn text-lg px-10 py-5"
                  disabled={loading}
                >
                  INITIATE NEURAL HANDSHAKE
                </button>
              </div>
              
              {/* Terminal Info */}
              <div className="terminal-window max-w-3xl mx-auto">
                <div className="mt-8 space-y-3 text-sm">
                  <div className="text-cyber-primary">&gt; reddit_stats --version 2.0.0</div>
                  <div className="text-cyber-accent">&gt; security_protocol: OAuth2.0_Authorization_Code_Flow</div>
                  <div className="text-cyber-accent">&gt; encryption: AES-256</div>
                  <div className="text-cyber-accent">&gt; data_access: READ_ONLY</div>
                  <div className="text-cyber-accent">&gt; privacy_mode: MAXIMUM</div>
                  <div className="text-cyber-warning">&gt; warning: credentials never stored locally</div>
                  <div className="text-cyber-primary">&gt; ready_for_neural_handshake...</div>
                </div>
              </div>
            </div>
          )}

          {loading && (
            <div className="cyber-card max-w-2xl mx-auto text-center py-16">
              <LoadingComponent />
            </div>
          )}

          {error && (
            <div className="cyber-card max-w-2xl mx-auto border-cyber-danger bg-red-900/20">
              <div className="text-cyber-danger font-mono text-center">
                <div className="text-2xl font-bold mb-4">[ERROR] NEURAL LINK FAILED</div>
                <div className="text-lg">{error}</div>
              </div>
            </div>
          )}

          {profile && (
            <div className="space-y-8">
              {/* User Header */}
              <div className="cyber-card text-center">
                <h2 className="text-3xl font-bold text-cyber-primary font-mono mb-2 text-shadow-cyber">
                  USER PROFILE: {profile.username}
                </h2>
                <div className="text-cyber-accent text-lg font-mono">
                  NEURAL INTERFACE ESTABLISHED • SINCE: {profile.account_created}
                </div>
              </div>

              <div className="section-divider"></div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="stat-card">
                  <div className="text-4xl font-bold text-cyber-primary neon-glow mb-4 text-shadow-cyber">
                    {profile.total_karma.toLocaleString()}
                  </div>
                  <div className="text-cyber-dim font-mono text-lg">TOTAL KARMA</div>
                  <div className="text-cyber-accent text-sm mt-2">DIGITAL REPUTATION</div>
                </div>
                
                <div className="stat-card">
                  <div className="text-4xl font-bold text-cyber-accent neon-glow mb-4 text-shadow-cyber">
                    {profile.total_posts.toLocaleString()}
                  </div>
                  <div className="text-cyber-dim font-mono text-lg">TOTAL POSTS</div>
                  <div className="text-cyber-accent text-sm mt-2">CONTENT SUBMISSIONS</div>
                </div>
                
                <div className="stat-card">
                  <div className="text-4xl font-bold text-cyber-secondary neon-glow mb-4 text-shadow-cyber">
                    {profile.total_comments.toLocaleString()}
                  </div>
                  <div className="text-cyber-dim font-mono text-lg">TOTAL COMMENTS</div>
                  <div className="text-cyber-accent text-sm mt-2">SOCIAL INTERACTIONS</div>
                </div>
                
                <div className="stat-card">
                  <div className="text-4xl font-bold text-cyber-warning neon-glow mb-4 text-shadow-cyber">
                    {((profile.total_comments / (profile.total_posts || 1))).toFixed(1)}
                  </div>
                  <div className="text-cyber-dim font-mono text-lg">COMMENTS/POST</div>
                  <div className="text-cyber-accent text-sm mt-2">ENGAGEMENT RATIO</div>
                </div>
              </div>

              <div className="section-divider"></div>

              {/* Detailed Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="cyber-card">
                  <h3 className="text-2xl font-bold text-cyber-primary mb-6 font-mono text-shadow-cyber">
                    KARMA BREAKDOWN
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-cyber-bg/30 rounded-lg">
                      <span className="text-cyber-dim text-lg">Link Karma:</span>
                      <span className="text-cyber-accent font-mono text-xl font-bold">{profile.link_karma.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-cyber-bg/30 rounded-lg">
                      <span className="text-cyber-dim text-lg">Comment Karma:</span>
                      <span className="text-cyber-secondary font-mono text-xl font-bold">{profile.comment_karma.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="cyber-card">
                  <h3 className="text-2xl font-bold text-cyber-primary mb-6 font-mono text-shadow-cyber">
                    ACTIVITY METRICS
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-cyber-bg/30 rounded-lg">
                      <span className="text-cyber-dim text-lg">Avg Karma/Post:</span>
                      <span className="text-cyber-accent font-mono text-xl font-bold">
                        {profile.total_posts > 0 ? (profile.link_karma / profile.total_posts).toFixed(1) : '0'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-cyber-bg/30 rounded-lg">
                      <span className="text-cyber-dim text-lg">Avg Karma/Comment:</span>
                      <span className="text-cyber-secondary font-mono text-xl font-bold">
                        {profile.total_comments > 0 ? (profile.comment_karma / profile.total_comments).toFixed(1) : '0'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terminal Output */}
              <div className="terminal-window">
                <div className="mt-8 space-y-2 text-sm">
                  <div className="text-cyber-primary">&gt; neural_scan_complete</div>
                  <div className="text-cyber-accent">&gt; user_profile_loaded: {profile.username}</div>
                  <div className="text-cyber-accent">&gt; total_data_points: {(profile.total_posts + profile.total_comments).toLocaleString()}</div>
                  <div className="text-cyber-accent">&gt; karma_efficiency: {(profile.total_karma / (profile.total_posts + profile.total_comments) || 0).toFixed(2)}</div>
                  <div className="text-cyber-warning">&gt; analyzing_behavioral_patterns...</div>
                  <div className="text-cyber-primary">&gt; status: ANALYSIS_COMPLETE</div>
                  <div className="text-cyber-secondary">&gt; neural_link_stable</div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="text-center mt-20">
          <div className="section-divider"></div>
          <div className="cyber-card max-w-4xl mx-auto mt-8">
            <div className="text-cyber-dim font-mono text-lg">
              REDDIT NEURAL INTERFACE v2.0.0
            </div>
            <div className="text-cyber-accent font-mono text-sm mt-2">
              SECURE OAUTH2 PROTOCOL • ZERO DATA RETENTION • MAXIMUM PRIVACY
            </div>
            <div className="text-cyber-primary font-mono text-xs mt-4">
              [NEURAL LINK TERMINATED] [MEMORY PURGED] [SESSION CLOSED]
            </div>
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
