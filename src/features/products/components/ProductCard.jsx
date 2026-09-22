import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { selectWishlistItems } from '../../wishlist/WishlistSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { addToCartAsync, selectCartItems } from '../../cart/CartSlice';

export const ProductCard = ({
  id,
  title,
  price ,
  thumbnail,
  brand = "Unknown Brand",
  stockQuantity = 0,
  handleAddRemoveFromWishlist = () => {},
  isWishlistCard = false,
  isAdminCard = false,
  bgColor = "white",
}) => {
  const navigate = useNavigate();
  const wishlistItems = useSelector(selectWishlistItems);
  const loggedInUser = useSelector(selectLoggedInUser);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const isProductAlreadyInWishlist = wishlistItems.some((item) => item.product._id === id);
  const isProductAlreadyInCart = cartItems.some((item) => item?.product?._id === id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    const data = { user: loggedInUser?._id, product: id };
    dispatch(addToCartAsync(data));
  };

  return (
    <div
      onClick={() => navigate(`/product-details/${id}`)}
      style={{ backgroundColor: bgColor }}
      className="group p-4  border hover:border-blue-400 w-full sm:w-72 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 cursor-pointer"
    >
      {/* Product Image */}
      <div className="mb-4  ">
        <img
          src={thumbnail}
          alt={`${title} photo unavailable`}
          className="w-full h-44 object-contain rounded-md"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold group-hover:text-black">{title}</h3>
          {!isAdminCard && (
            <motion.div whileHover={{ scale: 1.3 }} whileTap={{ scale: 1 }}>
              <input
                type="checkbox"
                onClick={(e) => e.stopPropagation()}
                checked={isProductAlreadyInWishlist}
                onChange={(e) => handleAddRemoveFromWishlist(e, id)}
                className="w-5 h-5 cursor-pointer"
              />
            </motion.div>
          )}
        </div>
        <p className="text-gray-500">
  {typeof brand === 'string' ? brand : brand?.name || 'Unknown'}
</p>

        <div className="flex justify-between items-center">
          <p className="text-lg font-bold">Rs.{price.toFixed(2)}</p>
          {!isWishlistCard && !isProductAlreadyInCart && !isAdminCard && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1 }}
              onClick={(e) => handleAddToCart(e)}
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Add To Cart
            </motion.button>
          )}
        </div>
<div className='flex justify-start items-end'>
        {stockQuantity <= 20 && (
          <p className="text-sm text-red-500">
            {stockQuantity === 1 ? 'Only 1 left in stock!' : 'Limited stock available!'}
          </p>
        )}
        </div>
      </div>
    </div>
  );
};

// PropTypes Validation
ProductCard.propTypes = {
  id: PropTypes.string.isRequired, // Product ID must be a string and is required
  title: PropTypes.string.isRequired, // Title must be a string and is required
  price: PropTypes.number, // Price must be a number, default to 0
  thumbnail: PropTypes.string.isRequired, // Thumbnail URL must be a string and is required
  brand: PropTypes.string, // Brand is optional and must be a string
  stockQuantity: PropTypes.number, // Stock quantity must be a number, default to 0
  handleAddRemoveFromWishlist: PropTypes.func, // Callback function for wishlist toggle
  isWishlistCard: PropTypes.bool, // Boolean to indicate if it's a wishlist card
  isAdminCard: PropTypes.bool, // Boolean to indicate if it's an admin card
  bgColor: PropTypes.string, // Background color as a string
};
