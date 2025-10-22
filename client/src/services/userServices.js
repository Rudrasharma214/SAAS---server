import api from './api.js';


export const getProjectForUser = async () => {
  try {
    const response = await api.get('/user/getproject');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching projects for user');
  }
};