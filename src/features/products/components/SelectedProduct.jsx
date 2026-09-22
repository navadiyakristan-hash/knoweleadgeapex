import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useSearchParams, useNavigate } from 'react-router-dom';
import {
  fetchProductsAsync,
  resetProductFetchStatus,
  selectProducts,
  selectProductFetchStatus,
  selectProductTotalResults
} from '../ProductSlice';

import {
  selectWishlistItems,
  createWishlistItemAsync,
  deleteWishlistItemByIdAsync,
  resetWishlistItemAddStatus,
  resetWishlistItemDeleteStatus,
  selectWishlistItemAddStatus,
  selectWishlistItemDeleteStatus
} from '../../wishlist/WishlistSlice';

import {
  resetCartItemAddStatus,
  selectCartItemAddStatus
} from '../../cart/CartSlice';

import { selectLoggedInUser } from '../../auth/AuthSlice';
import { toast } from 'react-toastify';
import { ITEMS_PER_PAGE } from '../../../constants';
import Lottie from 'lottie-react';
import loadingAnimation from '../../../assets/animations/loading.json';
import { addToCartAsync } from './../../cart/CartSlice';





const sortOptions = [
  { id: "price_asc", name: "Price: Low to High", sort: "price_asc" },
  { id: "price_desc", name: "Price: High to Low", sort: "price_desc" },
  { id: "name_asc", name: "Name: A to Z", sort: "name_asc" },
  { id: "name_desc", name: "Name: Z to A", sort: "name_desc" },
  { id: "rating", name: "Best Rating", sort: "rating" }
];

 const SelectedProduct = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(null);

  const products = useSelector(selectProducts);
  const fetchStatus = useSelector(selectProductFetchStatus);
  const total = useSelector(selectProductTotalResults);
  const wishlistItems = useSelector(selectWishlistItems);
  const wishlistAddStatus = useSelector(selectWishlistItemAddStatus);
  const wishlistDeleteStatus = useSelector(selectWishlistItemDeleteStatus);
  const cartAddStatus = useSelector(selectCartItemAddStatus);
  const loggedInUser = useSelector(selectLoggedInUser);

  const brand = searchParams.get('brand');
  const category = searchParams.get('category');
  const maxPrice = searchParams.get('maxPrice');
  const minPrice = searchParams.get('minPrice');
  const q = searchParams.get('q');
  const navigate = useNavigate();

  useEffect(() => {
    
    const filters = {
      ...(brand && { brand: [brand] }),
      ...(category && { category: [category] }),
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
      ...(q && { q }),
      pagination: { page, limit: ITEMS_PER_PAGE },
      sort: sort && { sort },
      user: true,
    };

    dispatch(fetchProductsAsync(filters));
  }, [brand, category, minPrice, maxPrice, q, sort, page]);


  const handleAddToCart = (e, productId) => {
    e.stopPropagation();
  
    if (!loggedInUser?._id) {
      toast.warning("Please log in to add items to cart");
      return;
    }
  
    const data = { user: loggedInUser._id, product: productId };
    dispatch(addToCartAsync(data));
  };
  
  

  useEffect(() => {
    if (wishlistAddStatus === "fulfilled") toast.success("Added to wishlist");
    if (wishlistAddStatus === "rejected") toast.error("Error adding to wishlist");

    if (wishlistDeleteStatus === "fulfilled") toast.success("Removed from wishlist");
    if (wishlistDeleteStatus === "rejected") toast.error("Error removing from wishlist");

    if (cartAddStatus === "fulfilled") toast.success("Added to cart");
    if (cartAddStatus === "rejected") toast.error("Error adding to cart");
  }, [wishlistAddStatus, wishlistDeleteStatus, cartAddStatus]);

  useEffect(() => {
    return () => {
      dispatch(resetProductFetchStatus());
      dispatch(resetWishlistItemAddStatus());
      dispatch(resetWishlistItemDeleteStatus());
      dispatch(resetCartItemAddStatus());
    };
  }, []);

  const handleAddRemoveFromWishlist = (e, productId) => {
    if (e.target.checked) {
      const data = { user: loggedInUser?._id, product: productId };
      dispatch(createWishlistItemAsync(data));
    } else {
      const index = wishlistItems.findIndex(item => item.product._id === productId);
      dispatch(deleteWishlistItemByIdAsync(wishlistItems[index]._id));
    }
  };


  return (
    <div className="p-4 max-w-screen-xl mx-auto " >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Products</h2>
        <div className="flex items-center space-x-2">
          {/* <label htmlFor="sort" className="text-sm">S</label> */}
          <select
            id="sort"
            value={sort || ""}
            onChange={(e) => setSort(e.target.value)}
            className="border px-2 py-1 text-sm rounded"
          >
            <option value="">Reset</option>
            {sortOptions.map(option => (
              <option key={option.id} value={option.sort}>{option.name}</option>
            ))}
          </select>
        </div>
      </div>

      {fetchStatus === 'pending' ? (
        <div className="flex justify-center items-center h-80">
          <Lottie animationData={loadingAnimation} className="w-40 h-40" />
        </div>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products found for your selection.</p>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">{total} results found</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 "
          >
            {products.map((product) => (
              <div key={product._id} className="border rounded-lg p-3 shadow-sm hover:shadow-md transition" onClick={() => navigate(`/product-details/${product._id}`)}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-40 w-full object-contain mb-2"
                />
                <h3 className="text-base font-medium truncate">{product.title}</h3>
                <p className="text-sm text-gray-500 mb-1">₹{product.price}</p>

                <div className="flex justify-between items-center">
                  <label className="text-sm">
                    <input
                      type="checkbox"
                      className="mr-1"
                      checked={wishlistItems.some(item => item.product._id === product._id)}
                      onChange={(e) => handleAddRemoveFromWishlist(e, product._id)}
                    />
                    Wishlist
                  </label>
                  <button
                    className="text-xs bg-black text-white px-2 py-1 rounded hover:bg-gray-800"
                    onClick={(e) => handleAddToCart(e, product._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-4 py-2 bg-gray-100 hover:bg-black hover:text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm font-medium">
              Page {page} of {Math.ceil(total / ITEMS_PER_PAGE)}
            </span>
            <button
              disabled={page === Math.ceil(total / ITEMS_PER_PAGE)}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 bg-gray-100 hover:bg-black hover:text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default SelectedProduct;