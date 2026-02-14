import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthContext from './context/AuthContext';
import NavBar from './components/NavBar';
import AuthForm from './components/AuthForm';
import CreateReport from './pages/CreateReport';
import UserCollection from './pages/UserCollection';
import Guns from "./pages/Guns"
import FirearmSearch from './components/FirearmSearch';
import Search from './pages/Search';
import FirearmDetail from "./pages/FirearmDetail";
import VerifyEmail from "./pages/VerifyEmail";



import './App.css';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/collection" />;
};

// Public Route component (redirects to dashboard if already authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return !isAuthenticated ? children : <Navigate to="/collection" />;
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


      <Route path="/search" element={
        <ProtectedRoute>
          {/* <FirearmSearch /> */}
          <Search />
        </ProtectedRoute>
      } />



<Route path="/guns" element={
            <Guns />
      } />

//------------------------------------------------------------DETAIL PAGE
<Route path="/firearm/:id" 
element={<FirearmDetail />} />


//-----------------------------------------------------------------Home Route


<Route path="/collection" element={
        // <ProtectedRoute>
          <UserCollection />
        // </ProtectedRoute>
      } />

      <Route path="/" element={<Navigate to="/guns" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <h1>Fail2Feed.com</h1>
          <h3>Handgun reliability data for the armed defender</h3>
          <NavBar />
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
