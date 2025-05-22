const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchUserData = async (accessToken) => {
  try {
    const response = await fetch(`${API_BASE_URL}/usercorp`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};