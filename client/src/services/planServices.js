import api from "./api"

export const subscribePlan = async (planId) => {
    try {
        const response = await api.post('/plan/subscribeplan', { planId });
        return response.data;
    } catch (error) {
        console.error('Error subscribing to plan:', error);
        throw error;
    }
}

export const createOrder = async (amount) => {
    try {
        const response = await api.post('/plan/create-order', { amount });
        return response.data;
        } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
}

export const verifyPayment = async (paymentData) => {
    try {
        const response = await api.post('/plan/verify-payment', paymentData);
        return response.data;
    } catch (error) {
        console.error('Error verifying payment:', error);
        throw error;
    }
}

export const getAllPlans = async () => {    
    try {
        const response = await api.get('/superadmin/get-plans');
        return response.data;
    } catch (error) {
        console.error('Error fetching plans:', error);
        throw error;
    }
}