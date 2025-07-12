import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import WeddingTemplate from './components/WeddingTemplate';
import AdminPanel from './components/AdminPanel';
import { ThemeProvider } from './context/ThemeContext';
import { WeddingProvider } from './context/WeddingContext';
import { supabase } from './lib/supabase';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsAuthenticated(!!session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-forest-900 flex items-center justify-center">
        <div className="animate-pulse text-ivory-100 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <WeddingProvider>
        <Router>
          <Routes>
            <Route path="/" element={<WeddingTemplate />} />
            <Route 
              path="/admin" 
              element={
                isAuthenticated ? (
                  <AdminPanel />
                ) : (
                  <AdminLogin setIsAuthenticated={setIsAuthenticated} />
                )
              } 
            />
          </Routes>
        </Router>
      </WeddingProvider>
    </ThemeProvider>
  );
}

function AdminLogin({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      setIsAuthenticated(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-900 via-slate-800 to-forest-800 flex items-center justify-center p-4">
      <div className="bg-ivory-50 dark:bg-slate-800 p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-serif text-forest-900 dark:text-ivory-100 mb-6 text-center">
          Admin Login
        </h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-forest-700 dark:text-ivory-200 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-forest-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-forest-700 dark:text-ivory-200 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-forest-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
              required
            />
          </div>
          
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-forest-600 hover:bg-forest-700 text-ivory-100 py-2 px-4 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;