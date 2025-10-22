import api from './api.js';


export const getManagerEmployees = async (managerId) => {
  try {
    const response = await api.get('/manager/employees');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching manager employees');
  }
};

export const getEmployeeDetails = async (employeeId) => {
  try {
    const response = await api.get(`/manager/employees/${employeeId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching employee details');
  }
};

export const getProjectsForManager = async () => {
  try {
    const response = await api.get('/manager/projects');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching projects for manager');
  }
};

export const addTeamMembersToProject = async (projectId, includes) => {
  try {
    const response = await api.post(`/manager/project/${projectId}/addteam`, { includes });
    return response.data;
  } catch (error) {
    throw new Error('Error updating project details');
  } 
};

