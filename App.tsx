import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { Layout } from './components/layout/Layout';
import { Landing } from './pages/Landing';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { Dashboard } from './pages/Dashboard';
import { Events } from './pages/Events';
import { CreateEvent } from './pages/CreateEvent';
import { Ticketing } from './pages/Ticketing';
import { Marketing } from './pages/Marketing';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';
import { Attendees } from './pages/Attendees';
import { PublicEvent } from './pages/PublicEvent';
import { BuyerDashboard } from './pages/BuyerDashboard';
import { MyTickets } from './pages/MyTickets';

// Helper to protect routes
const ProtectedRoute: React.FC<{ children: React.ReactNode, requiredRole?: 'organizer' | 'buyer' }> = ({ children, requiredRole }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-500">Loading...</div>;
  if (!currentUser) return <Navigate to="/login" />;
  
  if (requiredRole && currentUser.role !== requiredRole) {
      // Redirect to their appropriate dashboard if they try to access a route for the other role
      return <Navigate to={currentUser.role === 'buyer' ? '/browse' : '/dashboard'} />;
  }

  return <Layout>{children}</Layout>;
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
            <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/event/:id" element={<PublicEvent />} />

                {/* Organizer Routes */}
                <Route path="/dashboard" element={<ProtectedRoute requiredRole="organizer"><Dashboard /></ProtectedRoute>} />
                <Route path="/events" element={<ProtectedRoute requiredRole="organizer"><Events /></ProtectedRoute>} />
                <Route path="/events/create" element={<ProtectedRoute requiredRole="organizer"><CreateEvent /></ProtectedRoute>} />
                <Route path="/ticketing" element={<ProtectedRoute requiredRole="organizer"><Ticketing /></ProtectedRoute>} />
                <Route path="/marketing" element={<ProtectedRoute requiredRole="organizer"><Marketing /></ProtectedRoute>} />
                <Route path="/analytics" element={<ProtectedRoute requiredRole="organizer"><Analytics /></ProtectedRoute>} />
                <Route path="/attendees" element={<ProtectedRoute requiredRole="organizer"><Attendees /></ProtectedRoute>} />
                
                {/* Buyer Routes */}
                <Route path="/browse" element={<ProtectedRoute requiredRole="buyer"><BuyerDashboard /></ProtectedRoute>} />
                <Route path="/my-tickets" element={<ProtectedRoute requiredRole="buyer"><MyTickets /></ProtectedRoute>} />

                {/* Shared Routes */}
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            </Router>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;