import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthContext from './context/AuthContext';
import NavBar from './components/NavBar';
import AuthForm from './components/AuthForm';
import CreateReport from './pages/CreateReport';
import UserDashboard from './pages/UserDashboard';
import FirearmSearch from './components/FirearmSearch';
import './App.css';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Public Route component (redirects to dashboard if already authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={
        <PublicRoute>
          <AuthForm />
        </PublicRoute>
      } />
      <Route path="/create-report" element={
        <ProtectedRoute>
          <CreateReport />
        </ProtectedRoute>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <UserDashboard />
        </ProtectedRoute>
      } />
      <Route path="/search" element={
        <ProtectedRoute>
          <FirearmSearch />
        </ProtectedRoute>
      } />
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <NavBar />
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
