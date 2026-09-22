import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearOtpVerificationError,
  clearResendOtpError,
  clearResendOtpSuccessMessage,
  resendOtpAsync,
  resetOtpVerificationStatus,
  resetResendOtpStatus,
  selectLoggedInUser,
  selectOtpVerificationError,
  selectOtpVerificationStatus,
  selectResendOtpError,
  selectResendOtpStatus,
  selectResendOtpSuccessMessage,
  verifyOtpAsync,
} from '../AuthSlice';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useTheme } from '../../../theme/ThemeContext';

export const OtpVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const loggedInUser = useSelector(selectLoggedInUser);
  const resendOtpStatus = useSelector(selectResendOtpStatus);
  const resendOtpError = useSelector(selectResendOtpError);
  const resendOtpSuccessMessage = useSelector(selectResendOtpSuccessMessage);
  const otpVerificationStatus = useSelector(selectOtpVerificationStatus);
  const otpVerificationError = useSelector(selectOtpVerificationError);

  const theme = useTheme();

  // Handle redirection
  useEffect(() => {
    if (!loggedInUser) {
      navigate('/login');
    } else if (loggedInUser?.isVerified) {
      navigate('/');
    }
  }, [loggedInUser, navigate]);

  // Handle resend OTP error
  useEffect(() => {
    if (resendOtpError) {
      toast.error(resendOtpError.message || 'Failed to resend OTP');
    }
    return () => {
      dispatch(clearResendOtpError());
    };
  }, [resendOtpError, dispatch]);

  // Handle resend OTP success message
  useEffect(() => {
    if (resendOtpSuccessMessage) {
      toast.success(resendOtpSuccessMessage.message);
    }
    return () => {
      dispatch(clearResendOtpSuccessMessage());
    };
  }, [resendOtpSuccessMessage, dispatch]);

  // Handle OTP verification error
  useEffect(() => {
    if (otpVerificationError) {
      toast.error(otpVerificationError.message || 'Invalid OTP');
    }
    return () => {
      dispatch(clearOtpVerificationError());
    };
  }, [otpVerificationError, dispatch]);

  // Handle OTP verification success
  useEffect(() => {
    if (otpVerificationStatus === 'fulfilled') {
      toast.success('Email verified! We are happy to have you here');
      dispatch(resetResendOtpStatus());
    }
    return () => {
      dispatch(resetOtpVerificationStatus());
    };
  }, [otpVerificationStatus, dispatch]);

  const handleSendOtp = () => {
    const data = { user: loggedInUser?._id };
    dispatch(resendOtpAsync(data));
  };

  const handleVerifyOtp = (data) => {
    const cred = { ...data, userId: loggedInUser?._id };
    dispatch(verifyOtpAsync(cred));
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg space-y-6">
        <h1
          className="text-2xl font-bold text-center"
          style={{ fontFamily: theme.typography.fontFamily }}
        >
          Verify Your Email Address
        </h1>

        {resendOtpStatus === 'fulfilled' ? (
          <form
            onSubmit={handleSubmit(handleVerifyOtp)}
            className="space-y-4"
            noValidate
            style={{ fontFamily: theme.typography.fontFamily }}
          >
            <div className="text-center text-gray-600">
              <p>Enter the 4-digit OTP sent to:</p>
              <p className="font-semibold">{loggedInUser?.email}</p>
            </div>
            <div>
              <input
                type="number"
                {...register('otp', {
                  required: 'OTP is required',
                  minLength: { value: 4, message: 'Please enter a 4-digit OTP' },
                })}
                placeholder="Enter OTP"
                className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
              />
              {errors.otp && (
                <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
              )}
            </div>
            <button
              type="submit"
              className={`w-full p-3 bg-blue-500 text-white rounded ${
                otpVerificationStatus === 'pending'
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-blue-600'
              }`}
              disabled={otpVerificationStatus === 'pending'}
            >
              {otpVerificationStatus === 'pending' ? 'Verifying...' : 'Verify'}
            </button>
          </form>
        ) : (
          <div className="space-y-4 text-center">
            <p className="text-gray-600">We will send an OTP to:</p>
            <p className="font-semibold text-gray-600">{loggedInUser?.email}</p>
            <button
              onClick={handleSendOtp}
              className={`w-full p-3 bg-blue-500 text-white rounded ${
                resendOtpStatus === 'pending'
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-blue-600'
              }`}
              disabled={resendOtpStatus === 'pending'}
            >
              {resendOtpStatus === 'pending' ? 'Sending...' : 'Get OTP'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
