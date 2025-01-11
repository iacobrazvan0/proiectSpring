import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterComponent = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [profile, setProfile] = useState('');
  const [role, setRole] = useState(''); // set the default role as 'USER'
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      email,
      password,
      firstname,
      lastname,
      phonenumber,
      profile,
      role, // Send the role directly as a string
    };

    console.log('User data sent to backend:', userData); // Log the data

    try {
      await axios.post('http://localhost:9090/user/', userData);
      alert('User registered successfully');
      navigate('/login'); // Redirect to login after successful registration
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Register</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phonenumber}
          onChange={(e) => setPhonenumber(e.target.value)}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="text"
          placeholder="Profile"
          value={profile}
          onChange={(e) => setProfile(e.target.value)}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button
          type="submit"
          style={{
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Register
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: '#2196F3', textDecoration: 'none' }}>
          Login here
        </Link>
      </p>
    </div>
  );
};

export default RegisterComponent;
