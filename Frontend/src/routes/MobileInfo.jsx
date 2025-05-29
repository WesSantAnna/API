import { useState } from 'react';
import { fetchInfoData } from '../api/ApiService';
import './styles/MobileInfo.css'; // Importando o CSS

export default function MobileInfo() {
  const [siteId, setSiteId] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFetch = async () => {
    if (!siteId.trim()) {
      setError('Por favor, insira um Site ID');
      return;
    }

    setIsLoading(true);
    try {
      const result = await fetchInfoData(siteId);
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
    <div className="mobile-info-container">
      <div className="search-section">
        <h2 className="section-title">Informações do Site</h2>
        <div className="search-box">
          <input
            type="text"
            value={siteId}
            onChange={(e) => setSiteId(e.target.value)}
            onKeyUp={handleKeyPress}
            placeholder="Digite o site ID"
            className="search-input"
          />
          <button 
            onClick={handleFetch} 
            className="search-button"
            disabled={isLoading}
          >
            {isLoading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>

      {data && (
        <div className="data-section">
          <h3 className="data-title">Resultados para Site ID: {siteId}</h3>
          <div className="data-grid">
            {Object.entries(data).map(([key, value]) => (
              <div key={key} className="data-card">
                <h4 className="data-key">{key}</h4>
                <div className="data-value">
                  {typeof value === 'object' ? (
                    <pre>{JSON.stringify(value, null, 2)}</pre>
                  ) : (
                    String(value)
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}