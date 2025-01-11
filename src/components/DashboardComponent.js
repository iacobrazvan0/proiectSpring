import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const DashboardComponent = () => {
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    const storedRole = localStorage.getItem('role');

    setUsername(storedUsername || '');
    setRole(storedRole || '');

    if (!isAuthenticated || !token) {
      setIsTokenValid(false);
      logout();
      navigate('/login');
    } else {
      setIsTokenValid(true);
    }
  }, [isAuthenticated, logout, navigate]);

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div style={{ padding: '20px' }}>
      {isTokenValid ? (
        username ? (
          <div>
            <h2>Welcome, {username}!</h2>
            <p>Role: {role}</p>
            {role === 'ADMIN' && (
              <button onClick={handleRegisterRedirect} style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white' }}>
                Register New User
              </button>
            )}
            {role === 'USER' && <p>You have user-specific access. Enjoy your quizzes!</p>}
          </div>
        ) : (
          <p>Loading user details...</p>
        )
      ) : (
        <p>Your session has expired. Please log in again.</p>
      )}
    </div>
  );
};

export default DashboardComponent;
