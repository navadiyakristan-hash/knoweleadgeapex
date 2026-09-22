import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLoggedInUser,
  signupAsync,
  selectSignupStatus,
  selectSignupError,
  clearSignupError,
  resetSignupStatus,
} from '../AuthSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Lottie from 'lottie-react';
import { ecommerceOutlookAnimation } from '../../../assets';
import { motion } from 'framer-motion';
import { useTheme } from '../../../theme/ThemeContext';

export const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const status = useSelector(selectSignupStatus);
  const error = useSelector(selectSignupError);
  const loggedInUser = useSelector(selectLoggedInUser);

  const theme = useTheme();

  useEffect(() => {
    if (loggedInUser) {
      navigate('/');
    }
  }, [loggedInUser, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (status === 'fulfilled') {
      toast.success('Welcome! Verify your email to start shopping.');
      reset();
    }
    return () => {
      dispatch(clearSignupError());
      dispatch(resetSignupStatus());
    };
  }, [status, dispatch, reset]);

  const handleSignup = (data) => {
    const credentials = { ...data };
    delete credentials.confirmPassword; // Ensure confirmPassword is removed
    dispatch(signupAsync(credentials));
  };

  return (
    <div className="flex flex-row w-screen h-screen overflow-hidden">
      {/* Left Section: Animation */}
      <div className="hidden lg:flex flex-1 bg-black items-center justify-center">
        <Lottie animationData={ecommerceOutlookAnimation} />
      </div>

      {/* Right Section: Signup Form */}
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

          {/* Signup Form */}
          <form
            onSubmit={handleSubmit(handleSignup)}
            className="space-y-4"
            noValidate
            style={{ fontFamily: theme.typography.fontFamily }}
          >
            {/* Name Field */}
            <motion.div whileHover={{ y: -5 }}>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                placeholder="Name"
                className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </motion.div>

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
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                    message:
                      'At least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.',
                  },
                })}
                placeholder="Password"
                className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </motion.div>

            {/* Confirm Password Field */}
            <motion.div whileHover={{ y: -5 }}>
              <input
                type="password"
                {...register('confirmPassword', {
                  required: 'Confirm Password is required',
                  validate: (value, formValues) =>
                    value === formValues.password || "Passwords don't match",
                })}
                placeholder="Confirm Password"
                className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
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
                {status === 'pending' ? 'Signing up...' : 'Signup'}
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
              to="/login"
              className="text-gray-500 hover:text-gray-600"
            >
              Already a member?{' '}
              <span
                className="text-blue-500 hover:underline"
                style={{ color: theme.colors.primary.dark }}
              >
                Login
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
