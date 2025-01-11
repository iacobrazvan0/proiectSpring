import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Client } from '@stomp/stompjs';

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  useEffect(() => {
    if (isAuthenticated) {
      const token = localStorage.getItem('token');
const client = new Client({
  brokerURL: `ws://localhost:9090/ws?token=Bearer ${token}`, // Prefixul "Bearer " este inclus
  onConnect: () => {
    console.log('Connected to WebSocket');
  },
  onStompError: (error) => {
    console.error('WebSocket Error:', error);
  },
});
client.activate();

        setStompClient(client);

        return () => {
            if (client) client.deactivate();
        };
    }
}, [isAuthenticated]);


  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ padding: '10px', backgroundColor: '#333', color: 'white' }}>
      <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <li>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        </li>

        {isAuthenticated && (
          <>
            <li style={{ position: 'relative' }}>
              Notifications
              <div style={{
                position: 'absolute',
                top: '30px',
                background: 'white',
                color: 'black',
                padding: '10px',
                borderRadius: '5px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                minWidth: '200px'
              }}>
                {notifications.length > 0 ? (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {notifications.map((note, index) => (
                      <li key={index} style={{ borderBottom: '1px solid #ccc', padding: '5px 0' }}>
                        {note}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No new notifications</p>
                )}
              </div>
            </li>
            <li>
              <button
                onClick={handleLogout}
                style={{ color: 'white', background: 'red', border: 'none', padding: '5px 10px' }}
              >
                Logout
              </button>
            </li>
          </>
        )}

        {!isAuthenticated && (
          <li>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
