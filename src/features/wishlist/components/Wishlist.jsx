import React, { createContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createWishlistItemAsync,
  deleteWishlistItemByIdAsync,
  resetWishlistFetchStatus,
  resetWishlistItemAddStatus,
  resetWishlistItemDeleteStatus,
  resetWishlistItemUpdateStatus,
  selectWishlistItems,
  selectWishlistItemAddStatus,
  selectWishlistItemDeleteStatus,
  selectWishlistItemUpdateStatus,
  updateWishlistItemByIdAsync,
} from '../WishlistSlice';

import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { selectCartItems, addToCartAsync, resetCartItemAddStatus } from '../../cart/CartSlice';
import Lottie from 'lottie-react';
import { emptyWishlistAnimation, loadingAnimation } from '../../../assets';
import { motion } from 'framer-motion';


import { useTheme } from '../../../theme/ThemeContext';
import { ProductCard } from './../../products/components/ProductCard';


const Wishlist = () => {
  const dispatch = useDispatch();
  const theme = useTheme(); // Access global theme
 
  const wishlistItems = useSelector(selectWishlistItems);
  const wishlistItemAddStatus = useSelector(selectWishlistItemAddStatus);
  const wishlistItemDeleteStatus = useSelector(selectWishlistItemDeleteStatus);
  const wishlistItemUpdateStatus = useSelector(selectWishlistItemUpdateStatus);
  const loggedInUser = useSelector(selectLoggedInUser);
  const cartItems = useSelector(selectCartItems);

  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    if (wishlistItemAddStatus === 'fulfilled') {
      toast.success('Product added to wishlist');
    } else if (wishlistItemAddStatus === 'rejected') {
      toast.error('Error adding product to wishlist, please try again later');
    }
  }, [wishlistItemAddStatus]);

  useEffect(() => {
    if (wishlistItemDeleteStatus === 'fulfilled') {
      toast.success('Product removed from wishlist');
    } else if (wishlistItemDeleteStatus === 'rejected') {
      toast.error('Error removing product from wishlist, please try again later');
    }
  }, [wishlistItemDeleteStatus]);

  useEffect(() => {
    if (wishlistItemUpdateStatus === 'fulfilled') {
      toast.success('Wishlist item updated');
    } else if (wishlistItemUpdateStatus === 'rejected') {
      toast.error('Error updating wishlist item');
    }

    setEditIndex(-1);
    setEditValue('');
  }, [wishlistItemUpdateStatus]);

  useEffect(() => {
    return () => {
      dispatch(resetWishlistFetchStatus());
      dispatch(resetCartItemAddStatus());
      dispatch(resetWishlistItemUpdateStatus());
      dispatch(resetWishlistItemDeleteStatus());
      dispatch(resetWishlistItemAddStatus());
    };
  }, []);

  const handleNoteUpdate = (wishlistItemId) => {
    const update = { _id: wishlistItemId, note: editValue };
    dispatch(updateWishlistItemByIdAsync(update));
  };

  const handleAddToCart = (productId) => {
    const data = { user: loggedInUser?._id, product: productId };
    dispatch(addToCartAsync(data));
  };

  return (
    <div className="container mx-auto mt-8 mb-32">
      {/* Heading */}
      <div className="flex items-center space-x-4 mb-6">
        <motion.div whileHover={{ x: -5 }}>
          <Link to="/" className="text-blue-500 hover:text-blue-700">
            ← Back
          </Link>
        </motion.div>
        <h1
          className="text-3xl font-bold"
          style={{ fontFamily: theme.typography.fontFamily }}
        >
          Your Wishlist
        </h1>
      </div>

      {/* Wishlist Content */}
      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Lottie animationData={emptyWishlistAnimation} className="w-60" />
          <p
            className="text-gray-500 mt-4"
            style={{ fontSize: theme.typography.body1.fontSize }}
          >
            You have no items in your wishlist.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item, index) => (
            <div
              key={item._id}
              className="p-4 border rounded-lg shadow-md flex items-center justify-center flex-col"
            >
              <ProductCard
              key={item._id}
                id={item.product?._id || ''}
                brand={item.product?.brand?.name || 'Unknown'}
                price={item.product?.price || 0}
                thumbnail={item.product?.thumbnail || ''}
                title={item.product?.title || 'Untitled'}
                handleAddRemoveFromWishlist={() =>
                  dispatch(deleteWishlistItemByIdAsync(item._id))
                }
                isWishlistCard={true}
              />
              {/* Note Section */}
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-semibold">Note:</span>
                  {editIndex === index ? (
                    <textarea
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    />
                  ) : (
                    <p className="text-gray-600">{item.note || 'Add a note here.'}</p>
                  )}
                </div>
                {editIndex === index && (
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => handleNoteUpdate(item._id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditIndex(-1)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              {/* Add to Cart */}
              {cartItems.some((cartItem) => cartItem.product?._id === item.product?._id) ? (
                <Link
                  to="/cart"
                  className="block text-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
                >
                  Already in Cart
                </Link>
              ) : (
                <button
                  onClick={() => handleAddToCart(item.product?._id)}
                  className="block text-center px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Add to Cart
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
