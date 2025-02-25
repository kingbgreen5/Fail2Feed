import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Global styles (optional)
import { AuthProvider } from "./context/AuthContext"; // Import correctly

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
  <React.StrictMode>

    <App />

  </React.StrictMode>
  </AuthProvider>,
);
