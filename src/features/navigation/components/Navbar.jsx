
// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { motion } from 'framer-motion';
// import { FaShoppingCart, FaHeart, FaUserCircle, FaCog } from 'react-icons/fa';
// import {
//   selectLoggedInUser,
// } from '../../../features/auth/AuthSlice';
// import { toggleFilters } from '../../products/ProductSlice';
// import { selectCartItems } from './../../cart/CartSlice';
// import { selectWishlistItems } from './../../wishlist/WishlistSlice';

// export const Navbar = ({ isProductList = false }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const loggedInUser = useSelector(selectLoggedInUser);
//   const cartItems = useSelector(selectCartItems);
//   const wishlistItems = useSelector(selectWishlistItems);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);

//   const settings = [
//     { name: 'Home', to: '/' },
//     { name: 'Profile', to: loggedInUser?.isAdmin ? '/admin/profile' : '/profile' },
//     { name: loggedInUser?.isAdmin ? 'Orders' : 'My Orders', to: loggedInUser?.isAdmin ? '/admin/orders' : '/orders' },
//     { name: 'Logout', to: '/logout' },
//   ];

//   return (
//     <nav className="bg-gradient-to-r from-gray-900 via-gray-500 to-black text-yellow-500 shadow-lg fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center">
//       <h1 className="text-3xl font-extrabold cursor-pointer hover:text-yellow-400" onClick={() => navigate('/')}>MERN SHOP</h1>
      
//       <div className="hidden md:flex items-center gap-6">
//         <button className="text-lg hover:text-yellow-400" onClick={() => navigate('/')}>Home</button>
//       </div>
      
//       <div className="flex items-center gap-6">
//         <div className="relative">
//           <FaUserCircle size={32} className="cursor-pointer text-yellow-500 hover:text-yellow-400" onClick={() => setUserMenuOpen(!userMenuOpen)} />
//           {userMenuOpen && (
//             <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="absolute right-0 mt-3 bg-white text-black rounded shadow-lg overflow-hidden">
//               {loggedInUser?.isAdmin && (
//                 <button className="block px-5 py-3 text-lg hover:bg-gray-200 w-full text-left" onClick={() => navigate('/admin/add-product')}>Add New Product</button>
//               )}
//               {settings.map((setting) => (
//                 <button key={setting.name} className="block px-5 py-3 text-lg hover:bg-gray-200 w-full text-left" onClick={() => navigate(setting.to)}>
//                   {setting.name}
//                 </button>
//               ))}
//             </motion.div>
//           )}
//         </div>
        
//         <button onClick={() => navigate('/cart')} className="relative text-yellow-500 hover:text-yellow-400">
//           <FaShoppingCart size={28} />
//           {cartItems.length > 0 && (
//             <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">{cartItems.length}</span>
//           )}
//         </button>
        
//         {!loggedInUser?.isAdmin && wishlistItems?.length > 0 && (
//           <button onClick={() => navigate('/wishlist')} className="relative text-yellow-500 hover:text-yellow-400">
//             <FaHeart size={28} />
//             <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">{wishlistItems.length}</span>
//           </button>
//         )}
        
//         {isProductList && (
//           <button onClick={() => dispatch(toggleFilters())} className="p-3  bg-gray-800 rounded-full hover:bg-gray-700">
//             <FaCog size={24} className="text-yellow-500" />
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// };

// Navbar.propTypes = {
//   isProductList: PropTypes.bool,
// };

// Navbar.defaultProps = {
//   isProductList: false,
// };










import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaHeart, FaUserCircle, FaSearch, FaCog } from 'react-icons/fa';
import {
  selectLoggedInUser,
} from '../../../features/auth/AuthSlice';
import { toggleFilters } from '../../products/ProductSlice';
import { selectCartItems } from './../../cart/CartSlice';
import { selectWishlistItems } from './../../wishlist/WishlistSlice';

export const Navbar = ({ isProductList = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);
  const cartItems = useSelector(selectCartItems);
  const wishlistItems = useSelector(selectWishlistItems);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const settings = [
    { name: 'Home', to: '/' },
    { name: 'Profile', to: loggedInUser?.isAdmin ? '/admin/profile' : '/profile' },
    { name: loggedInUser?.isAdmin ? 'Orders' : 'My Orders', to: loggedInUser?.isAdmin ? '/admin/orders' : '/orders' },
    { name: 'Logout', to: '/logout' },
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-700 to-black text-gray-200 shadow-lg fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <motion.h1 className="text-3xl font-extrabold cursor-pointer hover:text-blue-300" onClick={() => navigate('/')}  > 
        MERN SHOP
      </motion.h1>

      {/* Search Bar */}
      <div className="flex items-center bg-white rounded-lg overflow-hidden w-1/2">
        <input 
          type="text" 
          className="px-4 py-2 w-full text-black outline-none"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button 
          className="bg-blue-500 px-4 py-2 text-white flex items-center"
          onClick={handleSearch}
        >
          <FaSearch size={18} />
        </button>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-6">
        {/* User Menu */}
        <div className="relative">
          <FaUserCircle 
            size={32} 
            className="cursor-pointer hover:text-blue-300" 
            onClick={() => setUserMenuOpen(!userMenuOpen)} 
          />
          {userMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="absolute right-0 mt-3 bg-white text-black rounded shadow-lg w-48"
            >
              {loggedInUser?.isAdmin && (
                <button className="block px-5 py-3 hover:bg-gray-200 w-full text-left" onClick={() => navigate('/admin/add-product')}>
                  Add New Product
                </button>
              )}
              {settings.map((setting) => (
                <button key={setting.name} className="block px-5 py-3 hover:bg-gray-200 w-full text-left" onClick={() => navigate(setting.to)}>
                  {setting.name}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Cart */}
        <button onClick={() => navigate('/cart')} className="relative text-gray-200 hover:text-blue-300">
          <FaShoppingCart size={28} />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">{cartItems.length}</span>
          )}
        </button>

        {/* Wishlist */}
        {!loggedInUser?.isAdmin && wishlistItems?.length > 0 && (
          <button onClick={() => navigate('/wishlist')} className="relative text-gray-200 hover:text-blue-300">
            <FaHeart size={28} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">{wishlistItems.length}</span>
          </button>
        )}
        
        {/* Filter Button (Only for Product List Page) */}
        {isProductList && (
          <button onClick={() => dispatch(toggleFilters())} className="p-3 bg-gray-800 rounded-full hover:bg-gray-700">
            <FaCog size={24} className="text-gray-200" />
          </button>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  isProductList: PropTypes.bool,
};

Navbar.defaultProps = {
  isProductList: false,
};
