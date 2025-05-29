import { useEffect, useState } from "react";
import { fetchLubricantsData } from "../api/ApiService";
import "./styles/lubricants.css";

export default function Lubricants() {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await fetchLubricantsData();
                setData(result);
            } catch (err) {
                setError('Erro ao carregar dados.');
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    if (isLoading) return (
      <div className="usercorp-loading">
        <div className="usercorp-spinner"></div>
        <p>Carregando dados dos lubrificantes...</p>
      </div>
    );
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="lubricants-container">
            <h2 className="lubricants-title">Dados de Lubrificantes</h2>
            
            <div className="lubricants-grid">
                {Array.isArray(data) ? (
                    data.map((item, index) => (
                        <div key={index} className="lubricant-card">
                            <h3>{item.name || 'Lubrificante'}</h3>
                            <div className="lubricant-details">
                                {Object.entries(item).map(([key, value]) => (
                                    <div key={key} className="detail-row">
                                        <span className="detail-label">{key}:</span>
                                        <span className="detail-value">{JSON.stringify(value)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="lubricant-single">
                        <div className="lubricant-details">
                            {Object.entries(data).map(([key, value]) => (
                                <div key={key} className="detail-row">
                                    <span className="detail-label">{key}:</span>
                                    <span className="detail-value">{JSON.stringify(value)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}