import { useState, useEffect } from 'react';
import { login, fetchUserData } from './ApiService';
import './App.css';

function App() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accessToken, setAccessToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const tokenData = await login(username, password);
      setAccessToken(tokenData.access);
      
      const userDataResponse = await fetchUserData(tokenData.access); 
      setUserData(userDataResponse);
    } catch (err) {
      setError(err.message);
    }
  };
  
  return (
    <div>
      {!accessToken ? (
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      ) : (

        <div>
          <h2>Rota Usercorp</h2>
          <pre>{JSON.stringify(userData?.user, null, 2)}</pre>

          <h3>Corporação</h3>
          <ul>
            {userData?.corporation?.slice(0, 10).map((corp) => (
              <li key={corp.id}>{corp.name}</li>
            ))}
          </ul>

          <h3>Dados</h3>
          <ul>
            {userData?.sites?.slice(0, 10).map((site) => (
              <li key={site.id}>
                {site.name} (Corp ID: {site.corporation})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;