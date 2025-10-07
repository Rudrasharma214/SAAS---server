import api from './api';

export const getAllCompanies = async (page = 1, limit = 10) => {
  const response = await api.get(`/superadmin/companies?page=${page}&limit=${limit}`);
  return response.data;
};

export const getCompanyById = async (companyId) => {
  const response = await api.get(`/superadmin/companies/${companyId}`);
  return response.data;
};

export const createPlan = async (planData) => {
  const response = await api.post('/superadmin/create-plans', planData);
  return response.data;
};

export const getAllPlans = async () => {
  const response = await api.get('/superadmin/get-plans');
  return response.data;
};
