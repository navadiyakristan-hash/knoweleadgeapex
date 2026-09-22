import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { checkAuthAsync, selectIsAuthChecked, selectLoggedInUser } from "./features/auth/AuthSlice";
import { fetchLoggedInUserByIdAsync } from "./features/user/UserSlice";
import { fetchAllCategoriesAsync } from "./features/categories/CategoriesSlice";
import { fetchAllBrandsAsync } from "./features/brands/BrandSlice";
import { fetchCartByUserIdAsync } from "./features/cart/CartSlice";
import { fetchAddressByUserIdAsync } from "./features/address/AddressSlice";
import { fetchWishlistByUserIdAsync } from "./features/wishlist/WishlistSlice";

import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import { HomePage } from "./pages/HomePage";
// import HomePage from './pages/HomePage'
import { CartPage } from "./pages/CartPage";
import { UserProfilePage } from "./pages/UserProfilePage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { OrderSuccessPage } from "./pages/OrderSuccessPage";
import { UserOrdersPage } from "./pages/UserOrdersPage";
import { WishlistPage } from "./pages/WishlistPage";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";
import { Logout } from "./features/auth/components/Logout";
import { NotFoundPage } from "./pages/NotFoundPage";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { ProductUpdatePage } from "./pages/ProductUpdatePage";
import { AddProductPage } from "./pages/AddProductPage";
import { AdminOrdersPage } from "./pages/AdminOrdersPage";
import ProductPage from './pages/ProductPage';

function App() {
  const dispatch = useDispatch();
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const loggedInUser = useSelector(selectLoggedInUser);

  // Check authentication status
  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  // Fetch user-related data if logged in
  useEffect(() => {
    if (loggedInUser?.isVerified) {
      dispatch(fetchLoggedInUserByIdAsync(loggedInUser?._id));
      dispatch(fetchAllBrandsAsync());
      dispatch(fetchAllCategoriesAsync());

      if (!loggedInUser.isAdmin) {
        dispatch(fetchCartByUserIdAsync(loggedInUser?._id));
        dispatch(fetchAddressByUserIdAsync(loggedInUser?._id));
        dispatch(fetchWishlistByUserIdAsync(loggedInUser?._id));
      }
    }
  }, [dispatch, loggedInUser]);

  // Show loading screen while authentication is being checked
  if (!isAuthChecked) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    
      <Routes>
        {/* Redirect logic: If authenticated, redirect to appropriate dashboard */}
        {!loggedInUser && <Route path="*" element={<Navigate to="/login" />} />}
        {loggedInUser?.isAdmin && <Route path="*" element={<Navigate to="/admin/dashboard" />} />}
        {loggedInUser && !loggedInUser.isAdmin && <Route path="*" element={<Navigate to="/" />} />}

        {/* Public Routes (Only accessible when NOT logged in) */}
        {!loggedInUser && (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:userId/:passwordResetToken" element={<ResetPasswordPage />} />
          </>
        )}

        {/* Admin Routes */}
        {loggedInUser?.isAdmin && (
          <>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/product-update/:id" element={<ProductUpdatePage />} />
            <Route path="/admin/add-product" element={<AddProductPage />} />
            <Route path="/admin/orders" element={<AdminOrdersPage />} />
          </>
        )}

        {/* User Routes */}
        {loggedInUser && !loggedInUser.isAdmin && (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success/:id" element={<OrderSuccessPage />} />
            <Route path="/orders" element={<UserOrdersPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/products" element={<ProductPage />} />

          </>
        )}

        {/* Common Routes (Available to all logged-in users) */}
        {loggedInUser && (
          <>
            <Route path="/logout" element={<Logout />} />
            <Route path="/product-details/:id" element={<ProductDetailsPage />} />
          </>
        )}

        {/* Not Found Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
   
  );
}

export default App;
