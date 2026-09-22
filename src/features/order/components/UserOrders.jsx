import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOrderByUserIdAsync,
  resetOrderFetchStatus,
  selectOrderFetchStatus,
  selectOrders,
} from '../OrderSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import {
  addToCartAsync,
  resetCartItemAddStatus,
  selectCartItemAddStatus,
  selectCartItems,
} from '../../cart/CartSlice';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import { loadingAnimation, noOrdersAnimation } from '../../../assets';
import { toast } from 'react-toastify';
import { useTheme } from '../../../theme/ThemeContext';
import { motion } from 'framer-motion';

export const UserOrders = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);
  const orders = useSelector(selectOrders);
  const cartItems = useSelector(selectCartItems);
  const orderFetchStatus = useSelector(selectOrderFetchStatus);
  const cartItemAddStatus = useSelector(selectCartItemAddStatus);

  const theme = useTheme();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (loggedInUser) {
      dispatch(getOrderByUserIdAsync(loggedInUser._id));
    }
    return () => {
      dispatch(resetOrderFetchStatus());
      dispatch(resetCartItemAddStatus());
    };
  }, [loggedInUser, dispatch]);

  useEffect(() => {
    if (cartItemAddStatus === 'fulfilled') {
      toast.success('Product added to cart');
    } else if (cartItemAddStatus === 'rejected') {
      toast.error('Error adding product to cart. Please try again later.');
    }
  }, [cartItemAddStatus]);

  useEffect(() => {
    if (orderFetchStatus === 'rejected') {
      toast.error('Error fetching orders. Please try again later.');
    }
  }, [orderFetchStatus]);

  const handleAddToCart = (product) => {
    const item = { user: loggedInUser._id, product: product._id, quantity: 1 };
    dispatch(addToCartAsync(item));
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {orderFetchStatus === 'pending' ? (
        <div className="w-auto h-[calc(100vh-4rem)] flex justify-center items-center">
          <Lottie animationData={loadingAnimation} className="w-60" />
        </div>
      ) : (
        <div className="w-full max-w-4xl p-4 space-y-8 mb-16">
          {/* Heading */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            <motion.div whileHover={{ x: -5 }} className="self-center">
              <Link to="/" className="text-blue-500 hover:text-blue-700">
                ← Back to Home
              </Link>
            </motion.div>
            <div>
              <h1
                className="text-2xl font-bold"
                style={{ fontFamily: theme.typography.fontFamily }}
              >
                Order History
              </h1>
              <p
                className="text-gray-500"
                style={{ fontFamily: theme.typography.fontFamily }}
              >
                Check the status of recent orders, manage returns, and discover similar
                products.
              </p>
            </div>
          </div>

          {/* Orders */}
          <div className="space-y-6">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div
                  key={order._id}
                  className="p-4 bg-white rounded-lg shadow-md space-y-4"
                >
                  {/* Order Info */}
                  <div className="flex flex-wrap justify-between gap-4">
                    <div>
                      <p className="font-semibold">Order Number</p>
                      <p className="text-gray-500">{order._id}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Date Placed</p>
                      <p className="text-gray-500">
                        {new Date(order.createdAt).toDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold">Total Amount</p>
                      <p className="text-gray-500">${order.total}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Items</p>
                      <p className="text-gray-500">{order.item.length}</p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-4">
                    {order.item.map((product) => (
                      <div key={product.product._id} className="flex gap-4">
                        {/* Product Image */}
                        <img
                          src={product.product.images[0]}
                          alt={product.product.title}
                          className="w-24 h-24 object-contain rounded-lg"
                        />

                        {/* Product Info */}
                        <div className="flex flex-col justify-between flex-1">
                          <div>
                            <h2
                              className="font-semibold text-lg"
                              style={{ fontFamily: theme.typography.fontFamily }}
                            >
                              {product.product.title}
                            </h2>
                            <p className="text-gray-500">
                              {product.product.brand.name}
                            </p>
                            <p className="text-gray-500">Qty: {product.quantity}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-lg font-bold">
                              ${product.product.price}
                            </p>
                            <div className="flex gap-2">
                              <Link
                                to={`/product-details/${product.product._id}`}
                                className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white"
                              >
                                View Product
                              </Link>
                              {cartItems.some(
                                (cartItem) => cartItem.product._id === product.product._id
                              ) ? (
                                <Link
                                  to="/cart"
                                  className="px-4 py-2 bg-gray-200 text-gray-600 rounded"
                                >
                                  Already in Cart
                                </Link>
                              ) : (
                                <button
                                  onClick={() => handleAddToCart(product.product)}
                                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                  Buy Again
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Status */}
                  <div>
                    <p className="text-gray-600">Status: {order.status}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <Lottie animationData={noOrdersAnimation} className="w-60" />
                <p
                  className="text-gray-500 text-center"
                  style={{ fontFamily: theme.typography.fontFamily }}
                >
                  Oh! Looks like you havent been shopping lately.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
