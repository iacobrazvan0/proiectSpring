import React, { createContext, useContext, useEffect, useState } from 'react';
import JwtUtils from '../utils/JwtUtils';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(localStorage.getItem('role') || 'USER');

  const login = (token, username, userRole) => {
    localStorage.setItem('token', `Bearer ${token}`);  // Salvează tokenul cu prefixul Bearer
    localStorage.setItem('username', username);
    localStorage.setItem('role', userRole ? userRole.toUpperCase() : 'USER');
    setIsAuthenticated(true);
    setRole(userRole ? userRole.toUpperCase() : 'USER');
  };
  
  

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    setRole('USER');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    const username = localStorage.getItem('username');
  
    if (token && storedRole && username) {
      const decoded = JwtUtils.decodeToken(token);
      if (decoded && decoded.role && decoded.role === storedRole) {
        setRole(storedRole.toUpperCase());
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, role }}>
      {children}
    </AuthContext.Provider>
  );
};
