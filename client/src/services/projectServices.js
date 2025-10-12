import api from './api.js';

export const createProject = async (projectData) => {
  const response = await api.post('/projects/createproject', projectData);
  return response.data;
}

export const getProjects = async () => {
  const response = await api.get('/projects/getproject');
  return response.data;
}

export const updateProject = async (projectId, updateData) => {
  const response = await api.patch(`/projects/update/${projectId}`, updateData);
  return response.data;
}

export const deleteProject = async (projectId) => {
  const response = await api.delete(`/projects/delete/${projectId}`);
  return response.data;
}