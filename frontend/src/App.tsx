import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './i18n';

// Pages
import LoginPage from './pages/LoginPage';
import ResidentDashboard from './pages/ResidentDashboard';
import SecurityDashboard from './pages/SecurityDashboard';
import AddVisitor from './pages/AddVisitor';
import VisitorHistory from './pages/VisitorHistory';
import FrequentVisitors from './pages/FrequentVisitors';
import QRScanner from './pages/QRScanner';
import Emergency from './pages/Emergency';

// Components
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';

interface User {
  id: string;
  username: string;
  role: 'resident' | 'security';
  flatNumber?: string;
  name?: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('avms_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('avms_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('avms_user');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <AnimatePresence mode="wait">
          <Routes>
            <Route
              path="/login"
              element={
                user ? (
                  <Navigate to={user.role === 'resident' ? '/dashboard' : '/security'} replace />
                ) : (
                  <LoginPage onLogin={handleLogin} />
                )
              }
            />
            
            {/* Resident Routes */}
            <Route
              path="/dashboard"
              element={
                user && user.role === 'resident' ? (
                  <Layout userRole="resident" user={user} onLogout={handleLogout}>
                    <ResidentDashboard user={user} />
                  </Layout>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/add-visitor"
              element={
                user && user.role === 'resident' ? (
                  <Layout userRole="resident" user={user} onLogout={handleLogout}>
                    <AddVisitor user={user} />
                  </Layout>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/history"
              element={
                user && user.role === 'resident' ? (
                  <Layout userRole="resident" user={user} onLogout={handleLogout}>
                    <VisitorHistory user={user} />
                  </Layout>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/frequent-visitors"
              element={
                user && user.role === 'resident' ? (
                  <Layout userRole="resident" user={user} onLogout={handleLogout}>
                    <FrequentVisitors user={user} />
                  </Layout>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/emergency"
              element={
                user && user.role === 'resident' ? (
                  <Layout userRole="resident" user={user} onLogout={handleLogout}>
                    <Emergency user={user} />
                  </Layout>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Security Routes */}
            <Route
              path="/security"
              element={
                user && user.role === 'security' ? (
                  <Layout userRole="security" user={user} onLogout={handleLogout}>
                    <SecurityDashboard user={user} />
                  </Layout>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/qr-scanner"
              element={
                user && user.role === 'security' ? (
                  <Layout userRole="security" user={user} onLogout={handleLogout}>
                    <QRScanner user={user} />
                  </Layout>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Default redirects */}
            <Route
              path="/"
              element={
                user ? (
                  <Navigate to={user.role === 'resident' ? '/dashboard' : '/security'} replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;