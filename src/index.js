import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './hooks/useAuth';  // Asigură-te că importi AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>  {/* Incearcă să înfășori App în AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);
