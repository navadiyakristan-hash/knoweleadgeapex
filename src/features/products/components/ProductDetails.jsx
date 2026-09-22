

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  clearSelectedProduct,
  fetchProductByIdAsync,
  fetchProductsAsync ,
  resetProductFetchStatus,
  selectProductFetchStatus,
  selectSelectedProduct,
} from '../ProductSlice';
import {
  addToCartAsync,
  resetCartItemAddStatus,
  selectCartItemAddStatus,
  selectCartItems,
} from '../../cart/CartSlice';
import {
  fetchReviewsByProductIdAsync,
  resetReviewFetchStatus,
  selectReviews,
} from '../../review/ReviewSlice';
import { Reviews } from '../../review/components/Reviews';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { loadingAnimation } from '../../../assets';
import {
  createWishlistItemAsync,
  deleteWishlistItemByIdAsync,
  resetWishlistItemAddStatus,
  resetWishlistItemDeleteStatus,
  selectWishlistItemAddStatus,
  selectWishlistItemDeleteStatus,
  selectWishlistItems,
} from '../../wishlist/WishlistSlice';
import { useTheme } from '../../../theme/ThemeContext';

import { selectLoggedInUser } from '../../auth/AuthSlice';



const SIZES = ['XS', 'S', 'M', 'L', 'XL'];
const COLORS = ['#020202', '#F6F6F6', '#B82222', '#BEA9A9', '#E2BB8D'];

export const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const theme = useTheme();

  const product = useSelector(selectSelectedProduct);
  const cartItems = useSelector(selectCartItems);
  const cartItemAddStatus = useSelector(selectCartItemAddStatus);
  const wishlistItems = useSelector(selectWishlistItems);
  const reviews = useSelector(selectReviews);
  const productFetchStatus = useSelector(selectProductFetchStatus);
  const wishlistItemAddStatus = useSelector(selectWishlistItemAddStatus);
  const wishlistItemDeleteStatus = useSelector(selectWishlistItemDeleteStatus);
  const loggedInUser = useSelector(selectLoggedInUser);

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(SIZES[0]);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const isProductAlreadyInCart = cartItems.some((item) => item.product?._id === id);

  const isProductAlreadyInWishlist = wishlistItems.some((item) => item.product._id === id);

  const totalReviewRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  const averageRating = Math.ceil(totalReviewRating / reviews.length) || 0;



  // useEffect(() => {
  //   dispatch(fetchProductByIdAsync(id)); // fetch by ID always
  //   dispatch(fetchProductsAsync({ user: true })); // fetch all for ProductSlider
  // }, [id]);
  







  useEffect(() => {
    window.scrollTo({ top: 0 });
  
    if (id) {
      dispatch(fetchProductByIdAsync(id)); // Fetch product detail
      dispatch(fetchReviewsByProductIdAsync(id)); // Fetch reviews
      dispatch(fetchProductsAsync({ user: true })); // ✅ Fetch all products for slider
    }
  
    return () => {
      dispatch(clearSelectedProduct());
      dispatch(resetProductFetchStatus());
      dispatch(resetReviewFetchStatus());
      dispatch(resetWishlistItemAddStatus());
      dispatch(resetWishlistItemDeleteStatus());
      dispatch(resetCartItemAddStatus());
    };
  }, [id, dispatch]);
  

  useEffect(() => {
    if (cartItemAddStatus === 'fulfilled') toast.success('Product added to cart');
    if (cartItemAddStatus === 'rejected') toast.error('Error adding product to cart');
  }, [cartItemAddStatus]);

  useEffect(() => {
    if (wishlistItemAddStatus === 'fulfilled') toast.success('Product added to wishlist');
    if (wishlistItemAddStatus === 'rejected') toast.error('Error adding to wishlist');
  }, [wishlistItemAddStatus]);

  useEffect(() => {
    if (wishlistItemDeleteStatus === 'fulfilled') toast.success('Product removed from wishlist');
    if (wishlistItemDeleteStatus === 'rejected') toast.error('Error removing from wishlist');
  }, [wishlistItemDeleteStatus]);

  const handleAddToCart = () => {
    if (!isProductAlreadyInCart) {
      dispatch(addToCartAsync({ user: loggedInUser?._id, product: id, quantity }));
      setQuantity(1);
    } else {
      toast.info('Product already in cart');
    }
  };

  const handleAddRemoveFromWishlist = (e) => {
    if (e.target.checked) {
      dispatch(createWishlistItemAsync({ user: loggedInUser?._id, product: id }));
    } else {
      const wishlistItem = wishlistItems.find((item) => item.product._id === id);
      if (wishlistItem) dispatch(deleteWishlistItemByIdAsync(wishlistItem._id));
    }
  };

  const handleIncreaseQty = () => {
    setQuantity((prev) => (prev < 20 ? prev + 1 : prev));
  };

  const handleDecreaseQty = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleColorSelect = (index) => {
    setSelectedColorIndex(index);
  };

  return (
    <div className="bg-gray-100 min-h-screen pt-20 py-12 px-6">
        {productFetchStatus === 'pending' && (
         <div className="flex justify-center items-center h-screen">
           <Lottie animationData={loadingAnimation} />
         </div>
       )}
  {product && (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 p-6">
          <div className="relative">
            <img
              src={[product.thumbnail, ...product.images][selectedImageIndex]}
              alt={product.title}
              className="w-full h-96 object-contain rounded-xl transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="flex justify-center gap-3 mt-4">
            {[product.thumbnail, ...product.images].map((img, index) => (
              <motion.img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                className={`w-16 h-16 rounded-lg border cursor-pointer transition-transform ${
                  selectedImageIndex === index
                    ? 'border-blue-500 ring-2 ring-blue-500 scale-105'
                    : 'border-gray-300 hover:scale-105'
                }`}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2 p-8 flex flex-col justify-between">
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-2xl font-semibold text-gray-800 mt-4">${product.price}</p>

          {/* Size Selection */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Select Size:</h2>
            <div className="mt-2 flex gap-3">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  className={`px-4 py-2 rounded-md transition-all ${
                    selectedSize === size
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Select Color:</h2>
            <div className="mt-2 flex gap-3">
              {COLORS.map((color, index) => (
                <div
                  key={index}
                  onClick={() => handleColorSelect(index)}
                  className={`w-10 h-10 rounded-full border-2 cursor-pointer transition-all ${
                    selectedColorIndex === index ? 'border-blue-600 scale-110' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>

          {/* Quantity & Buttons */}
          <div className="mt-6 flex items-center gap-6">
            {/* Quantity Selector */}
            <div className="flex items-center">
              <button
                onClick={handleDecreaseQty}
                className="px-4 py-2 bg-gray-300 rounded-l-md hover:bg-gray-400"
              >
                -
              </button>
              <span className="px-6 py-2 bg-white border">{quantity}</span>
              <button
                onClick={handleIncreaseQty}
                className="px-4 py-2 bg-gray-300 rounded-r-md hover:bg-gray-400"
              >
                +
              </button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition-all"
            >
              {isProductAlreadyInCart ? 'In Cart' : 'Add to Cart'}
            </button>

            {/* Wishlist */}
            <label htmlFor="wishlist-toggle" className="cursor-pointer">
              <input
                id="wishlist-toggle"
                type="checkbox"
                checked={isProductAlreadyInWishlist}
                onChange={handleAddRemoveFromWishlist}
                className="hidden"
              />
              <motion.div
                className={`p-3 rounded-full transition-all ${
                  isProductAlreadyInWishlist ? 'bg-red-500' : 'bg-gray-200'
                }`}
                whileHover={{ scale: 1.1 }}
              >
                {/* Heart Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </motion.div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )}

  {/* Reviews */}
  <div className="max-w-6xl mx-auto mt-12">

    <Reviews productId={id} averageRating={averageRating} />

  </div>


  {/* Related Products */}
  {/* <div className="">

<ProductSlider/>


  </div> */}
</div>

  );
};







 




