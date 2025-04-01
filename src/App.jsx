import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify({ email: 'user@example.com' }));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <Router>
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

export default App
