// src/features/payment/PaymentSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createPaypalOrder, capturePaypalOrder } from './PaymentApi';

const initialState = {
  status: 'idle',
  orderData: null,
  captureData: null,
  error: null,
};

export const createPaypalOrderAsync = createAsyncThunk(
  'payment/createPaypalOrderAsync',
  async (amount) => {
    const response = await createPaypalOrder(amount);
    return response;
  }
);

export const capturePaypalOrderAsync = createAsyncThunk(
  'payment/capturePaypalOrderAsync',
  async (orderID) => {
    const response = await capturePaypalOrder(orderID);
    return response;
  }
);

const paymentSlice = createSlice({
  name: 'paymentSlice',
  initialState,
  reducers: {
    resetPaymentStatus: (state) => {
      state.status = 'idle';
      state.error = null;
      state.orderData = null;
      state.captureData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPaypalOrderAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(createPaypalOrderAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.orderData = action.payload;
      })
      .addCase(createPaypalOrderAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })

      .addCase(capturePaypalOrderAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(capturePaypalOrderAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.captureData = action.payload;
      })
      .addCase(capturePaypalOrderAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      });
  },
});

export const { resetPaymentStatus } = paymentSlice.actions;

export const selectPaymentStatus = (state) => state.paymentSlice.status;
export const selectPaypalOrderData = (state) => state.paymentSlice.orderData;
export const selectPaypalCaptureData = (state) => state.paymentSlice.captureData;
export const selectPaymentError = (state) => state.paymentSlice.error;

export default paymentSlice.reducer;
