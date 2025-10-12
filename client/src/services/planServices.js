import api from './api';

export const subscribePlan = async (planId) => {
  try {
    const response = await api.post('/plan/subscribeplan', { planId });
    return response.data;
  } catch (error) {
    console.error('Error subscribing to plan:', error);
    throw error;
  }
};

export const createOrder = async (amount) => {
  try {
    const response = await api.post('/plan/create-order', { amount });
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const verifyPayment = async (paymentData) => {
  try {
    const response = await api.post('/plan/verify-payment', paymentData);
    return response.data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};

export const getAllPlans = async () => {
  try {
    const response = await api.get('/superadmin/get-plans');
    return response.data;
  } catch (error) {
    console.error('Error fetching plans:', error);
    throw error;
  }
};

export const updatePlan = async (planId, planData) => {
  try {
    const response = await api.patch(`/plan/updateplan/${planId}`, planData);
    return response.data;
  } catch (error) {
    console.error('Error updating plan:', error);
    throw error;
  }
};

export const deletePlan = async (planId) => {
  try {
    const response = await api.delete(`/plan/deleteplan/${planId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting plan:', error);
    throw error;
  }
};
