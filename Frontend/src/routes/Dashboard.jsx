import { useNavigate } from 'react-router-dom';
import './styles/Dashboard.css'; 

export default function Dashboard() {
  const navigate = useNavigate();

  const routes = [
    { path: '/usercorp', label: 'Usuários Corporativos' },
    { path: '/implantation/mobile/static/get_lubricants', label: 'Lubrificantes' },
    { path: '/implantation/mobile/tree', label: 'Árvore de Dados' },
    { path: '/implantation/mobile/info', label: 'Informações' },
    { path: '/implantation/mobile/static', label: 'Dados Estáticos' }
  ];

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Rotas Disponíveis</h2>
      <ul className="dashboard-list">
        {routes.map((route, index) => (
          <li key={index} className="dashboard-item">
            <button 
              onClick={() => navigate(route.path)} 
              className="dashboard-button"
            >
              {route.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}