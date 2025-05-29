import { useEffect, useState } from 'react';
import { fetchUsercorpData } from '../api/ApiService';
import './styles/usercorp.css';

export default function Usercorp() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchUsercorpData();
        setData(result);
        setError('');
      } catch (err) {
        setError('Erro ao carregar dados de usuários. Tente recarregar a página.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) return (
    <div className="usercorp-loading">
      <div className="usercorp-spinner"></div>
      <p>Carregando dados de usuários...</p>
    </div>
  );

  if (error) return <div className="usercorp-error">{error}</div>;

  const renderTable = () => {
    if (Array.isArray(data)) {
      return (
        <>
          <thead>
            <tr>
              {data.length > 0 && Object.keys(data[0]).map((key) => (
                <th key={key} className="usercorp-header">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={index} className="usercorp-row">
                {Object.values(user).map((value, i) => (
                  <td key={i} className="usercorp-cell">
                    {renderValue(value)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </>
      );
    } else if (typeof data === 'object' && data !== null) {
      return (
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            <tr key={key} className="usercorp-row">
              <td className="usercorp-cell usercorp-key-cell">{key}</td>
              <td className="usercorp-cell">{renderValue(value)}</td>
            </tr>
          ))}
        </tbody>
      );
    } else {
      return (
        <tbody>
          <tr>
            <td colSpan="2" className="usercorp-cell">
              {JSON.stringify(data)}
            </td>
          </tr>
        </tbody>
      );
    }
  };
  
  const renderValue = (value) => {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'object') {
      return <pre className="usercorp-pre">{JSON.stringify(value, null, 2)}</pre>;
    }
    return String(value);
  };

  return (
    <div className="usercorp-container">
      <h2 className="usercorp-title">Usuários Corporativos</h2>
      
      <div className="usercorp-table-wrapper">
        <table className="usercorp-table">
          {renderTable()}
        </table>
      </div>
    </div>
  );
}