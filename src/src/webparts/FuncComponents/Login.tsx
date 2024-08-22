import * as React from 'react';
import { useState } from 'react';
import './login.css';
import { encode } from './TokenEncryptor.mjs';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    console.log('Username:', username);
    console.log('Password:', password);

    const user = encode(username);
    const pass = encode(password);

    console.log(user, pass);

    try {
      const res = await fetch(`http://localhost:3000/getToken?user=${user}&pass=${pass}`, {
        method: 'GET',

      });
      console.log(res);

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        console.log(data.SecurityToken);
        if (data.SecurityToken) { // Assuming a successful login if 'SecurityToken' is present
          localStorage.setItem('accessToken', data.SecurityToken);
          localStorage.setItem('userID', data.UserID);
          localStorage.setItem('username', data.UserName);

          // Navigate to the JobView page
          navigate('/jobview');
        } else {
          console.error('Login failed: Invalid response data');
          alert('Login failed: Invalid response data'); // Show the error message to the user
        }
      } else {
        console.error('Failed to login:', res.statusText);
        alert('Failed to login: ' + res.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during login');
    }
  };

  return (
    <div className='content'>
      <form className='login' onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter User Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
