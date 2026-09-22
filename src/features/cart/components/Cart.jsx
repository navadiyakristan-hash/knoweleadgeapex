import React, { useEffect } from 'react';
import { CartItem } from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { resetCartItemRemoveStatus, selectCartItemRemoveStatus, selectCartItems } from '../CartSlice';
import { SHIPPING, TAXES } from '../../../constants';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

export const Cart = ({ checkout }) => {
  const items = useSelector(selectCartItems);
  const subtotal = items.reduce((acc, item) => (item.product?.price || 0) * item.quantity + acc, 0);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const navigate = useNavigate();
  const cartItemRemoveStatus = useSelector(selectCartItemRemoveStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    if (items.length === 0) {
      navigate('/');
    }
  }, [items, navigate]);

  useEffect(() => {
    if (cartItemRemoveStatus === 'fulfilled') {
      toast.success('Product removed from cart');
    } else if (cartItemRemoveStatus === 'rejected') {
      toast.error('Error removing product from cart. Please try again later.');
    }
    return () => {
      dispatch(resetCartItemRemoveStatus());
    };
  }, [cartItemRemoveStatus, dispatch]);

  return (
    <div className="flex flex-col items-center justify-start mb-16">
      <div className="w-full max-w-3xl mt-12 p-4 space-y-8">
        {/* Cart Items */}
        <div className="bg-white rounded-lg shadow-md p-4  mt-8 space-y-4">
          {items && items.length > 0 ? (
            items.map((item) => (
              <CartItem
                key={item._id}
                id={item._id}
                title={item.product?.title || 'Untitled'}
                brand={item.product?.brand?.name || 'Unknown Brand'}
                category={item.product?.category?.name || 'Unknown Category'}
                price={item.product?.price || 0}
                quantity={item.quantity || 0}
                thumbnail={item.product?.thumbnail || ''}
                stockQuantity={item.product?.stockQuantity || 0}
                productId={item.product?._id || ''}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">
              Your cart is empty. <Link to="/" className="text-blue-500">Continue shopping</Link>.
            </p>
          )}
        </div>

        {/* Subtotal */}
        <div className="flex justify-between items-center">
          {checkout ? (
            <div className="w-full space-y-4">
              <div className="flex justify-between">
                <p className="text-gray-600">Subtotal</p>
                <p>Rs{subtotal}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Shipping Charge</p>
                <p>Rs{SHIPPING}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">GST</p>
                <p>Rs{(subtotal * TAXES).toFixed(2)}</p>
              </div>
              <hr />
              <div className="flex justify-between font-bold">
                <p>Total</p>
                <p>Rs{(subtotal + SHIPPING + subtotal * TAXES).toFixed(2)}</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-2"> 
              <p className="font-semibold text-lg">Subtotal</p>
              <p>Total items in cart: {totalItems}</p>
              <p className="text-gray-500">Shipping and taxes will be calculated at checkout.</p>
            </div>
          )}
        </div>

        {/* Checkout or Continue Shopping */}
        {!checkout && (
          <div className="flex flex-col items-center space-y-4">
            <Link
              to="/checkout"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Checkout
            </Link>
            <motion.div whileHover={{ y: 2 }}>
              <Link
                to="/"
                className="px-4 py-2 border rounded-lg text-gray-500 hover:text-blue-500"
              >
                or continue shopping
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};
