import api from './api';

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const getProfile = async (token) => {
  const response = await api.post('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const logout = async (token) => {
  const response = await api.post('/auth/logout', null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
