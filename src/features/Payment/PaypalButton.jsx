import React from 'react';
import PropTypes from 'prop-types';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useDispatch } from 'react-redux';
import {
  createPaypalOrderAsync,
  capturePaypalOrderAsync,
  resetPaymentStatus
} from './PaymentSlice'; // Adjust your path as needed

const PaypalButton = ({ amount, onSuccess }) => {
  const dispatch = useDispatch();

  const createOrder = async () => {
    const resultAction = await dispatch(createPaypalOrderAsync(amount));
    if (createPaypalOrderAsync.fulfilled.match(resultAction)) {
      return resultAction.payload.id;
    } else {
      console.error('Failed to create PayPal order');
      throw new Error('createOrder failed');
    }
  };

  const captureOrder = async (orderID) => {
    const resultAction = await dispatch(capturePaypalOrderAsync(orderID));
    if (capturePaypalOrderAsync.fulfilled.match(resultAction)) {
      onSuccess(resultAction.payload);
      dispatch(resetPaymentStatus());
    } else {
      console.error('Failed to capture PayPal order');
      throw new Error('captureOrder failed');
    }
  };

  return (
    <PayPalScriptProvider options={{ "client-id": "Aaa5iWzpTA1oPqbOA7ykT7Emc6BqHh_EuUHBqs3p7mqsa8gIS12Z2m1ZZmCFHJpRnhLkrqlZMUnzf5j9" }}>
      <PayPalButtons
      //  fundingSource="card"
        style={{ layout: "vertical" }}
        createOrder={createOrder}
        onApprove={(data) => captureOrder(data.orderID)}
        onError={(err) => console.error("PayPal Checkout Error:", err)}
      />
    </PayPalScriptProvider>
  );
};

// ✅ Add prop validation
PaypalButton.propTypes = {
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default PaypalButton;
