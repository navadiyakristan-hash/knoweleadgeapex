import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearResetPasswordError,
  clearResetPasswordSuccessMessage,
  resetPasswordAsync,
  resetResetPasswordStatus,
  selectResetPasswordError,
  selectResetPasswordStatus,
  selectResetPasswordSuccessMessage,
} from '../AuthSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { useTheme } from '../../../theme/ThemeContext';

export const ResetPassword = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId, passwordResetToken } = useParams();

  const status = useSelector(selectResetPasswordStatus);
  const error = useSelector(selectResetPasswordError);
  const successMessage = useSelector(selectResetPasswordSuccessMessage);

  const theme = useTheme();

  // Handle errors
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
    return () => {
      dispatch(clearResetPasswordError());
    };
  }, [error, dispatch]);

  // Handle success
  useEffect(() => {
    if (status === 'fulfilled') {
      toast.success(successMessage?.message || 'Password reset successful!');
      navigate('/login');
    }
    return () => {
      dispatch(clearResetPasswordSuccessMessage());
    };
  }, [status, successMessage, dispatch, navigate]);

  // Reset status on unmount
  useEffect(() => {
    return () => {
      dispatch(resetResetPasswordStatus());
    };
  }, [dispatch]);

  const handleResetPassword = (data) => {
    const credentials = { ...data, userId, token: passwordResetToken };
    delete credentials.confirmPassword; // Remove confirmPassword from the payload
    dispatch(resetPasswordAsync(credentials));
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
          Reset Password
        </h1>
        <p className="text-gray-500 text-center">
          Please enter and confirm your new password.
        </p>

        {/* Reset Password Form */}
        <form
          onSubmit={handleSubmit(handleResetPassword)}
          className="space-y-4"
          noValidate
          style={{ fontFamily: theme.typography.fontFamily }}
        >
          {/* Password Field */}
          <motion.div whileHover={{ y: -2 }}>
            <input
              type="password"
              {...register('password', {
                required: 'Please enter a password',
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                  message:
                    'At least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.',
                },
              })}
              placeholder="New Password"
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </motion.div>

          {/* Confirm Password Field */}
          <motion.div whileHover={{ y: -2 }}>
            <input
              type="password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value, formValues) =>
                  value === formValues.password || "Passwords don't match",
              })}
              placeholder="Confirm New Password"
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
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
              {status === 'pending' ? 'Resetting...' : 'Reset Password'}
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  );
};
