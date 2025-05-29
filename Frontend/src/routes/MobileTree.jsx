import { useState } from 'react';
import { fetchTreeData } from '../api/ApiService';
import './styles/MobileTree.css';

export default function MobileTree() {
  const [siteId, setSiteId] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFetch = async () => {
    if (!siteId.trim()) {
      setError('Por favor, insira um Site ID válido');
      return;
    }

    setIsLoading(true);
    try {
      const result = await fetchTreeData(siteId);
      setData(result);
      setError('');
    } catch (err) {
      setError('Erro ao buscar dados. Verifique o Site ID e tente novamente.');
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFetch();
    }
  };

  return (
    <div className="tree-container">
      <div className="tree-search-section">
        <h2 className="tree-title">Árvore de Dados do Site</h2>
        <div className="tree-search-box">
          <input
            type="text"
            value={siteId}
            onChange={(e) => setSiteId(e.target.value)}
            onKeyUp={handleKeyPress}
            placeholder="Digite o site ID"
            className="tree-search-input"
          />
          <button 
            onClick={handleFetch} 
            className="tree-search-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner"></span>
            ) : (
              'Buscar Dados'
            )}
          </button>
        </div>
        {error && <p className="tree-error-message">{error}</p>}
      </div>

      {data && (
        <div className="tree-data-section">
          <h3 className="tree-data-title">Estrutura do Site: {siteId}</h3>
          <div className="tree-wrapper">
            {renderTree(data)}
          </div>
        </div>
      )}
    </div>
  );
}

function renderTree(data, level = 0) {
  return (
    <ul className={`tree-list level-${level}`}>
      {Object.entries(data).map(([key, value]) => (
        <li key={key} className="tree-node">
          <span className="tree-key">{key}</span>
          {typeof value === 'object' && value !== null ? (
            renderTree(value, level + 1)
          ) : (
            <span className="tree-value">{JSON.stringify(value)}</span>
          )}
        </li>
      ))}
    </ul>
  );
}