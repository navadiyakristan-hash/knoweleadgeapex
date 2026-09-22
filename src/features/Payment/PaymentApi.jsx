// src/features/payment/PaymentApi.js
import { axiosi } from '../../config/axios';

export const createPaypalOrder = async (amount) => {
    try {
      const res = await axiosi.post('/payment/create-order', { amount });
      console.log('✅ Backend PayPal response:', res.data);
      return res.data; // This must include { id: 'some-id', ... }
    } catch (error) {
      console.error('❌ PayPal create-order API error:', error.response?.data || error);
      throw error.response?.data || error;
    }
  };
  

export const capturePaypalOrder = async (orderID) => {
  try {
    const res = await axiosi.post(`/payment/capture-order/${orderID}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
