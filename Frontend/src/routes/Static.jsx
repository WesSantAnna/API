import { useEffect, useState } from 'react';
import { fetchStaticData } from '../api/ApiService';
import './styles/Static.css';

export default function Static() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchStaticData();
        setData(result);
      } catch (err) {
        setError('Erro ao carregar dados. Tente recarregar a página.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Carregando dados...</p>
    </div>
  );

  if (error) return <div className="error-container">{error}</div>;

  return (
    <div className="static-container">
      <h2 className="static-title">Dados Static do Sistema</h2>
      
      <div className="static-grid">
        {Array.isArray(data) ? (
          data.map((item, index) => (
            <div key={index} className="static-card">
              <div className="static-content">
                {Object.entries(item).map(([key, value]) => (
                  <div key={key} className="static-row">
                    <span className="static-key">{key}:</span>
                    <span className="static-value">
                      {typeof value === 'object' ? (
                        <pre>{JSON.stringify(value, null, 2)}</pre>
                      ) : (
                        String(value)
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="static-single">
            <div className="static-content">
              {Object.entries(data).map(([key, value]) => (
                <div key={key} className="static-row">
                  <span className="static-key">{key}:</span>
                  <span className="static-value">
                    {typeof value === 'object' ? (
                      <pre>{JSON.stringify(value, null, 2)}</pre>
                    ) : (
                      String(value)
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}