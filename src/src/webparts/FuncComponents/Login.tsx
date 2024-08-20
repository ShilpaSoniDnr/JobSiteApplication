import * as React from 'react';
import { useState } from 'react';
import './login.css';
import { encode } from './TokenEncryptor.mjs';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    console.log('Username:', username);
    console.log('Password:', password);

    const user = encode(username);
    const pass = encode(password);

    console.log(user, pass);

    try {
      const res = await fetch(`http://localhost:3000/proxy?user=${user}&pass=${pass}`, {
        method: 'GET',
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
      } else {
        console.error('Failed to fetch:', res.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
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
