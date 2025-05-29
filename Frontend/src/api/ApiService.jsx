// src/api/apiService.js
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (username, password) => {
  const response = await api.post('/token', { username, password });
  const { access, refresh } = response.data;

  // Salva tokens localmente
  localStorage.setItem('accessToken', access);
  localStorage.setItem('refreshToken', refresh);

  return response.data;
};

export const fetchUsercorpData = async () => {
  const accessToken = localStorage.getItem('accessToken');

  const response = await api.get('/usercorp', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export const fetchLubricantsData = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await api.get('/implantation/mobile/static/get_lubricants', {
        headers: {
            Authorization: ` Bearer ${accessToken}`,
        },
    });

    return response.data;
};

export const fetchTreeData = async (siteId) => {
  const accessToken = localStorage.getItem('accessToken');

  const response = await api.get(`/implantation/mobile/tree?site=${siteId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export const fetchInfoData = async (siteId) => {
  const accessToken = localStorage.getItem('accessToken');

  const response = await api.get(`/implantation/mobile/info?site=${siteId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export const fetchStaticData = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await api.get('/implantation/mobile/static', {
        headers: {
            Authorization: ` Bearer ${accessToken}`,
        },
    });

    return response.data;
};