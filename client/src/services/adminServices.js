import api from './api';

export const getAllUsers = async () => {
  try {
    const response = await api.get('/admin/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const registerCompany = async (companyData) => {
  try {
    const response = await api.post('/admin/register', companyData);
    return response.data;
  } catch (error) {
    console.error('Error registering company:', error);
    throw error;
  }
};

export const uploadLogo = async (logoFile) => {
  try {
    const formData = new FormData();
    formData.append('logo', logoFile);

    const response = await api.post('/admin/upload-logo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
  catch (error) {
    console.error('Error uploading logo:', error);
    throw error;
  }
}

export const getCompanyDetails = async () => {
  try {
    const response = await api.get('/admin/company-details');
    return response.data;
  } catch (error) {
    console.error('Error fetching company details:', error);
    throw error;
  }
};
