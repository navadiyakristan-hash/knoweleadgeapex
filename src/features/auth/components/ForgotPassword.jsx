import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearForgotPasswordError,
  clearForgotPasswordSuccessMessage,
  forgotPasswordAsync,
  resetForgotPasswordStatus,
  selectForgotPasswordError,
  selectForgotPasswordStatus,
  selectForgotPasswordSuccessMessage,
} from '../AuthSlice';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../theme/ThemeContext';

export const ForgotPassword = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const status = useSelector(selectForgotPasswordStatus);
  const error = useSelector(selectForgotPasswordError);
  const successMessage = useSelector(selectForgotPasswordSuccessMessage);

  const theme = useTheme();

  // Handle errors
  useEffect(() => {
    if (error) {
      toast.error(error?.message);
    }
    return () => {
      dispatch(clearForgotPasswordError());
    };
  }, [error, dispatch]);

  // Handle success
  useEffect(() => {
    if (status === 'fulfilled') {
      toast.success(successMessage?.message || 'Reset link sent successfully!');
    }
    return () => {
      dispatch(clearForgotPasswordSuccessMessage());
    };
  }, [status, successMessage, dispatch]);

  // Reset status on unmount
  useEffect(() => {
    return () => {
      dispatch(resetForgotPasswordStatus());
    };
  }, [dispatch]);

  const handleForgotPassword = async (data) => {
    dispatch(forgotPasswordAsync(data));
    reset();
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg space-y-6">
        {/* Title */}
        <h1
          className="text-2xl font-bold text-center"
          style={{ fontFamily: theme.typography.fontFamily }}
        >
          {status === 'fulfilled' ? 'Email Sent!' : 'Forgot Your Password?'}
        </h1>
        <p className="text-gray-500 text-center">
          {status === 'fulfilled'
            ? 'Please check your inbox and click the link to reset your password.'
            : 'Enter your registered email below to receive a password reset link.'}
        </p>

        {/* Forgot Password Form */}
        {status !== 'fulfilled' && (
          <form
            onSubmit={handleSubmit(handleForgotPassword)}
            className="space-y-4"
            noValidate
            style={{ fontFamily: theme.typography.fontFamily }}
          >
            <motion.div whileHover={{ y: -2 }}>
              <input
                type="email"
                {...register('email', {
                  required: 'Please enter an email',
                  pattern: {
                    value:
                      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                    message: 'Enter a valid email',
                  },
                })}
                placeholder="Enter your email"
                className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 1 }}>
              <button
                type="submit"
                className={`w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 ${
                  status === 'pending' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={status === 'pending'}
              >
                {status === 'pending' ? 'Sending...' : 'Send Password Reset Link'}
              </button>
            </motion.div>
          </form>
        )}

        {/* Back to Login */}
        <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 1.05 }}>
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-600 text-sm underline text-center block"
            style={{ fontFamily: theme.typography.fontFamily }}
          >
            Go back to login
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
