import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Login from './routes/Login.jsx';
import Usercorp from './routes/usercorp.jsx';
import Dashboard from './routes/Dashboard.jsx';
import Lubricants from './routes/lubricants.jsx';
import MobileTree from './routes/MobileTree.jsx';
import MobileInfo from './routes/MobileInfo.jsx';
import Static from './routes/Static.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Login /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/usercorp', element: <Usercorp /> },
      { path: '/implantation/mobile/static/get_lubricants', element: <Lubricants/>},
      { path: '/implantation/mobile/tree', element: <MobileTree /> },
      { path: '/implantation/mobile/info', element: <MobileInfo /> },
      { path: '/implantation/mobile/static', element: <Static />}
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
