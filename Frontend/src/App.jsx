import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [dados, setDados] = useState([]);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  // Requisição GET
  useEffect(() => {
    fetch('')
      .then(res => res.json())
      .then(data => setDados(data))
      .catch(err => console.error("Erro em buscar dados", err));
  }, []);

  // Requisição POST
  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuario = {
      user,
      password
    };

    try {
      const res = await fetch('http://127.0.0.1:8000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
      });

      const resposta = await res.json();
      console.log("Usuário enviado com sucesso:", resposta);
    } catch (err) {
      console.error("Erro ao enviar usuário:", err);
    }
  };

  return (
    <div>
      <h1>Dados da API</h1>

      <ul>
        {dados.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>

      <h2>Dados do usuário</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuário"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;
