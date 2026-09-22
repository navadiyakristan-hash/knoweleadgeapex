import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLoggedInUser,
  loginAsync,
  selectLoginStatus,
  selectLoginError,
  clearLoginError,
  resetLoginStatus,
} from '../AuthSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Lottie from 'lottie-react';
import { ecommerceOutlookAnimation } from '../../../assets';
import { motion } from 'framer-motion';
import { useTheme } from '../../../theme/ThemeContext';

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const loggedInUser = useSelector(selectLoggedInUser);
  const status = useSelector(selectLoginStatus);
  const error = useSelector(selectLoginError);

  const theme = useTheme();

  // Redirect user after login
  useEffect(() => {
    if (loggedInUser?.isVerified) {
      navigate('/');
    } else if (loggedInUser && !loggedInUser?.isVerified) {
      navigate('/verify-otp');
    }
  }, [loggedInUser, navigate]);

  // Handle login error
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  // Handle login success
  useEffect(() => {
    if (status === 'fulfilled' && loggedInUser?.isVerified) {
      toast.success('Login successful');
      reset();
    }
    return () => {
      dispatch(clearLoginError());
      dispatch(resetLoginStatus());
    };
  }, [status, loggedInUser, dispatch, reset]);

  const handleLogin = (data) => {
    const credentials = { ...data };
    dispatch(loginAsync(credentials));
  };

  return (
    <div className="flex flex-row w-screen h-screen overflow-hidden">
      {/* Left Section: Animation */}
      <div className="hidden lg:flex flex-1 bg-black items-center justify-center">
        <Lottie animationData={ecommerceOutlookAnimation} />
      </div>

      {/* Right Section: Login Form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Title */}
          <div className="text-center">
            <h1
              className="text-4xl font-bold"
              style={{ fontFamily: theme.typography.fontFamily }}
            >
              Mern Shop
            </h1>
            <p className="text-gray-500">- Shop Anything</p>
          </div>

          {/* Login Form */}
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="space-y-4"
            noValidate
            style={{ fontFamily: theme.typography.fontFamily }}
          >
            {/* Email Field */}
            <motion.div whileHover={{ y: -5 }}>
              <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value:
                      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                    message: 'Enter a valid email',
                  },
                })}
                placeholder="Email"
                className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </motion.div>

            {/* Password Field */}
            <motion.div whileHover={{ y: -5 }}>
              <input
                type="password"
                {...register('password', {
                  required: 'Password is required',
                })}
                placeholder="Password"
                className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 1 }}>
              <button
                type="submit"
                className={`w-full p-3 text-white bg-blue-500 rounded hover:bg-blue-600 ${
                  status === 'pending' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={status === 'pending'}
              >
                {status === 'pending' ? 'Logging in...' : 'Login'}
              </button>
            </motion.div>
          </form>

          {/* Links */}
          <div className="flex justify-between items-center text-sm">
            <Link
              to="/forgot-password"
              className="text-blue-500 hover:text-blue-600"
            >
              Forgot Password?
            </Link>
            <Link
              to="/signup"
              className="text-gray-500 hover:text-gray-600"
            >
              Don’t have an account?{' '}
              <span
                className="text-blue-500 hover:underline"
                style={{ color: theme.colors.primary.dark }}
              >
                Register
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
