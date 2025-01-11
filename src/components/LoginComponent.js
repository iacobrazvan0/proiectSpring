import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';  // Importă hook-ul useAuth

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();  // Obține funcția de login din context

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9090/generate-token', { username, password }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log('Login successful, response:', response.data);

      // Salvăm token-ul și rolul
      localStorage.setItem('token', `Bearer ${response.data.token}`);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('username', username);  // Salvează și username-ul

      // Actualizează contextul de autentificare
      login(response.data.token, username, response.data.role);

      console.log('Navigating to dashboard...');
      navigate('/dashboard');  // Redirecționează la dashboard

    } catch (err) {
      console.error('Login error:', err.response ? err.response.data : err.message);
      setError('Invalid username or password');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleLogin} style={styles.form}>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} style={styles.input} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <p style={styles.register}>
          Don't have an account? <Link to="/register" style={styles.link}>Register here</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f9f9f9' },
  formContainer: { maxWidth: '400px', width: '100%', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: 'white' },
  title: { textAlign: 'center', marginBottom: '20px', color: '#333' },
  error: { color: 'red', textAlign: 'center', marginBottom: '10px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: { padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' },
  button: { padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' },
  register: { textAlign: 'center', marginTop: '20px', color: '#666' },
  link: { color: '#2196F3', textDecoration: 'none' },
};

export default LoginComponent;
