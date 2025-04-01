import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect, lazy, Suspense } from 'react'
import './App.css'

// Pages
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import RequirementInput from './pages/RequirementInput'
import ExtractionReview from './pages/ExtractionReview'
import Prioritization from './pages/Prioritization'
import DocumentGeneration from './pages/DocumentGeneration'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import ForgotPassword from './pages/ForgotPassword'
import ProtectedRoute from './components/ProtectedRoute'
import AIChatAssistant from './components/AIChatAssistant'
import OnboardingTutorial from './components/OnboardingTutorial';

// Lazy-loaded components
const OnboardingTutorialLazy = lazy(() => import('./components/OnboardingTutorial'));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    // Simulate a real authentication check with a slight delay
    const checkAuthStatus = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const user = localStorage.getItem('user');
      if (user) {
        setIsAuthenticated(true);
        setShowTutorial(true); // Show tutorial after authentication
      }
      setLoading(false);
    };
    
    checkAuthStatus();
  }, []);

  // Add useEffect to check if it's the user's first login
  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (isAuthenticated && !hasSeenTutorial) {
      setShowTutorial(true);
    }
  }, [isAuthenticated]);

  const handleLogin = async (userCredentials) => {
    // Simulate API login delay
    await new Promise(resolve => setTimeout(resolve, 1200));
        
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify({ 
      email: userCredentials?.email || 'user@example.com',
      name: userCredentials?.name || 'User',
      lastLogin: new Date().toISOString()
    }));
    setShowTutorial(true); // Show tutorial after login
  };

  const handleLogout = async () => {
    // Simulate API logout delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const handleCloseTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem('hasSeenTutorial', 'true');
  };

  // Show a loading indicator while checking authentication
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #6200ea',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '16px'
        }} />
        <p>Loading application...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <Router>
      {isAuthenticated && <AIChatAssistant />}
      
      {/* Wrap lazy-loaded components in Suspense */}
      <Suspense fallback={<div>Loading...</div>}>
        {isAuthenticated && (
          <OnboardingTutorialLazy 
            open={showTutorial} 
            onClose={handleCloseTutorial} 
          />
        )}
      </Suspense>
      
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />
        } />
        <Route path="/register" element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <Register onLogin={handleLogin} />
        } />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        <Route path="/dashboard" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Dashboard onLogout={handleLogout} />
          </ProtectedRoute>
        } />
        <Route path="/requirement-input" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <RequirementInput onLogout={handleLogout} />
          </ProtectedRoute>
        } />
        <Route path="/extraction-review/:id" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ExtractionReview onLogout={handleLogout} />
          </ProtectedRoute>
        } />
        <Route path="/prioritization/:id" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Prioritization onLogout={handleLogout} />
          </ProtectedRoute>
        } />
        <Route path="/document-generation/:id" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <DocumentGeneration onLogout={handleLogout} />
          </ProtectedRoute>
        } />
        <Route path="/analytics" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Analytics onLogout={handleLogout} />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Settings onLogout={handleLogout} />
          </ProtectedRoute>
        } />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
