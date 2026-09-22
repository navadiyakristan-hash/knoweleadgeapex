// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useForm } from 'react-hook-form';
// import { useNavigate, Link } from 'react-router-dom';
// import {
//   addAddressAsync,
//   selectAddressStatus,
//   selectAddresses,
// } from '../../address/AddressSlice';
// import {
//   selectLoggedInUser,
// } from '../../auth/AuthSlice';
// import {
//   createOrderAsync,
//   selectCurrentOrder,
//   selectOrderStatus,
// } from '../../order/OrderSlice';
// import {
//   resetCartByUserIdAsync,
//   selectCartItems,
// } from '../../cart/CartSlice';
// import { SHIPPING, TAXES } from '../../../constants';
// import { Cart } from '../../cart/components/Cart';
// import { motion } from 'framer-motion';
// import { useTheme } from '../../../theme/ThemeContext';

// export const Checkout = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { register, handleSubmit, reset, formState: { errors } } = useForm();

//   const addresses = useSelector(selectAddresses);
//   const loggedInUser = useSelector(selectLoggedInUser);
//   const addressStatus = useSelector(selectAddressStatus);
//   const cartItems = useSelector(selectCartItems);
//   const orderStatus = useSelector(selectOrderStatus);
//   const currentOrder = useSelector(selectCurrentOrder);

//   const orderTotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
//   const [selectedAddress, setSelectedAddress] = useState(addresses[0]);
//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('COD');

//   const theme = useTheme();

//   useEffect(() => {
//     if (addressStatus === 'fulfilled') {
//       reset();
//     }
//   }, [addressStatus, reset]);

//   useEffect(() => {
//     if (currentOrder && currentOrder._id) {
//       dispatch(resetCartByUserIdAsync(loggedInUser?._id));
//       navigate(`/order-success/${currentOrder._id}`);
//     }
//   }, [currentOrder, dispatch, loggedInUser, navigate]);

//   const handleAddAddress = (data) => {
//     const address = { ...data, user: loggedInUser._id };
//     dispatch(addAddressAsync(address));
//   };

//   const handleCreateOrder = () => {
//     const order = {
//       user: loggedInUser._id,
//       item: cartItems,
//       address: selectedAddress,
//       paymentMode: selectedPaymentMethod,
//       total: orderTotal + SHIPPING + TAXES,
//     };
//     dispatch(createOrderAsync(order));
//   };

//   return (
//     <div className="flex flex-wrap justify-center gap-6 p-4 mb-16">
//       {/* Left Section */}
//       <div className="space-y-6 w-full lg:w-1/2">
//         {/* Heading */}
//         <div className="flex items-center gap-4">
//           <motion.div whileHover={{ x: -5 }}>
//             <Link to="/cart" className="text-blue-500 hover:text-blue-700">
//               ← Back to Cart
//             </Link>
//           </motion.div>
//           <h2 className="text-2xl font-bold" style={{ fontFamily: theme.typography.fontFamily }}>
//             Shipping Information
//           </h2>
//         </div>

//         {/* Add Address Form */}
//         <form
//           onSubmit={handleSubmit(handleAddAddress)}
//           className="space-y-4"
//           style={{ fontFamily: theme.typography.fontFamily }}
//         >
//           <div>
//             <label className="block text-gray-600 mb-1">Type</label>
//             <input
//               type="text"
//               {...register('type', { required: true })}
//               placeholder="Eg. Home, Business"
//               className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-600 mb-1">Street</label>
//             <input
//               type="text"
//               {...register('street', { required: true })}
//               className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="flex gap-4">
//             <div className="flex-1">
//               <label className="block text-gray-600 mb-1">City</label>
//               <input
//                 type="text"
//                 {...register('city', { required: true })}
//                 className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div className="flex-1">
//               <label className="block text-gray-600 mb-1">State</label>
//               <input
//                 type="text"
//                 {...register('state', { required: true })}
//                 className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>
//           <div>
//             <button
//               type="submit"
//               className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               Add Address
//             </button>
//           </div>
//         </form>

//         {/* Payment Methods */}
//         <div className="space-y-4">
//           <h3 className="text-lg font-medium">Payment Methods</h3>
//           <div className="flex gap-4 items-center">
//             <input
//               type="radio"
//               name="paymentMethod"
//               checked={selectedPaymentMethod === 'COD'}
//               onChange={() => setSelectedPaymentMethod('COD')}
//               className="w-4 h-4"
//             />
//             <label>Cash on Delivery</label>
//           </div>
//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="w-full lg:w-1/3 space-y-6">
//         <h2 className="text-2xl font-bold">Order Summary</h2>
//         <Cart checkout />
//         <button
//           onClick={handleCreateOrder}
//           className={`w-full p-3 bg-green-500 text-white rounded ${
//             orderStatus === 'pending' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
//           }`}
//         >
//           {orderStatus === 'pending' ? 'Processing...' : 'Pay and Order'}
//         </button>
//       </div>
//     </div>
//   );
// };


























import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import {
  addAddressAsync,
  selectAddressStatus,
  selectAddresses,
} from '../../address/AddressSlice';
import {
  selectLoggedInUser,
} from '../../auth/AuthSlice';
import {
  createOrderAsync,
  selectCurrentOrder,
  selectOrderStatus,
} from '../../order/OrderSlice';
import {
  resetCartByUserIdAsync,
  selectCartItems,
} from '../../cart/CartSlice';
import { SHIPPING, TAXES } from '../../../constants';
import { Cart } from '../../cart/components/Cart';
import { motion } from 'framer-motion';
import { useTheme } from '../../../theme/ThemeContext';


import PaypalButton from './../../Payment/PaypalButton';


export const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const addresses = useSelector(selectAddresses);
  const loggedInUser = useSelector(selectLoggedInUser);
  const addressStatus = useSelector(selectAddressStatus);
  const cartItems = useSelector(selectCartItems);
  const orderStatus = useSelector(selectOrderStatus);
  const currentOrder = useSelector(selectCurrentOrder);

  const orderTotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('COD');

  const theme = useTheme();

  useEffect(() => {
    if (addressStatus === 'fulfilled') {
      reset();
    }
  }, [addressStatus, reset]);

  useEffect(() => {
    if (currentOrder && currentOrder._id) {
      dispatch(resetCartByUserIdAsync(loggedInUser?._id));
      navigate(`/order-success/${currentOrder._id}`);
    }
  }, [currentOrder, dispatch, loggedInUser, navigate]);

  const handleAddAddress = (data) => {
    const address = { ...data, user: loggedInUser._id };
    dispatch(addAddressAsync(address));
  };

  const handleCreateOrder = () => {
    const order = {
      user: loggedInUser._id,
      item: cartItems,
      address: selectedAddress,
      paymentMode: selectedPaymentMethod,
      total: orderTotal + SHIPPING + TAXES,
    };
    dispatch(createOrderAsync(order));
  };

  return (
    <div className="flex flex-wrap justify-center gap-6 p-4 mb-16">
      {/* Left Section */}
      <div className="space-y-6 w-full lg:w-1/2">
        {/* Heading */}
        <div className="flex items-center gap-4">
          <motion.div whileHover={{ x: -5 }}>
            <Link to="/cart" className="text-blue-500 hover:text-blue-700">
              ← Back to Cart
            </Link>
          </motion.div>
          <h2 className="text-2xl font-bold" style={{ fontFamily: theme.typography.fontFamily }}>
            Shipping Information
          </h2>
        </div>

        {/* Add Address Form */}
        <form
          onSubmit={handleSubmit(handleAddAddress)}
          className="space-y-4"
          style={{ fontFamily: theme.typography.fontFamily }}
        >
          <div>
            <label className="block text-gray-600 mb-1">Type</label>
            <input
              type="text"
              {...register('type', { required: true })}
              placeholder="Eg. Home, Business"
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Street</label>
            <input
              type="text"
              {...register('street', { required: true })}
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-600 mb-1">City</label>
              <input
                type="text"
                {...register('city', { required: true })}
                className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-600 mb-1">State</label>
              <input
                type="text"
                {...register('state', { required: true })}
                className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Address
            </button>
          </div>
        </form>

        {/* Payment Methods */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Payment Methods</h3>
          <div className="flex gap-4 items-center">
            <input
              type="radio"
              name="paymentMethod"
              checked={selectedPaymentMethod === 'COD'}
              onChange={() => setSelectedPaymentMethod('COD')}
              className="w-4 h-4"
            />
            <label>Cash on Delivery</label>
          </div>
          <div className="flex gap-4 items-center">
            <input
              type="radio"
              name="paymentMethod"
              checked={selectedPaymentMethod === 'PAYPAL'}
              onChange={() => setSelectedPaymentMethod('PAYPAL')}
              className="w-4 h-4"
            />
            <label>PayPal</label>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/3 space-y-6">
        <h2 className="text-2xl font-bold">Order Summary</h2>
        <Cart checkout />

        {/* COD Button */}
        {selectedPaymentMethod === 'COD' && (
          <button
            onClick={handleCreateOrder}
            className={`w-full p-3 bg-green-500 text-white rounded ${
              orderStatus === 'pending' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
            }`}
          >
            {orderStatus === 'pending' ? 'Processing...' : 'Pay and Order'}
          </button>
        )}

        {/* PayPal Button */}
        {selectedPaymentMethod === 'PAYPAL' && (
          <div className="mt-4">
           <PaypalButton
  amount={(orderTotal + SHIPPING + TAXES).toFixed(2)}
  onSuccess={(paymentData) => {
    console.log('PayPal payment successful:', paymentData);
    const order = {     
      user: loggedInUser._id,
      item: cartItems,
      address: selectedAddress,
      paymentMode: 'PAYPAL',
      total: orderTotal + SHIPPING + TAXES,
      paypal: {
        orderId: paymentData?.id,
        payerEmail: paymentData?.payer?.email_address,
      }
      
    };
    dispatch(createOrderAsync(order));
  }}
/>

          </div>
        )}
      </div>
    </div>
  );
};
