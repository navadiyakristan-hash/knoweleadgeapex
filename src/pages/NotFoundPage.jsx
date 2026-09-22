import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import { notFoundPageAnimation } from '../assets';

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 text-gray-700">
      {/* Animation */}
      <div className="w-80">
        <Lottie animationData={notFoundPageAnimation} />
      </div>

      {/* Text */}
      <div className="text-center mt-6">
        <h1 className="text-4xl font-semibold">404 Not Found</h1>
        <p className="text-lg font-light mt-2">
          Sorry, we couldnt find the page you were looking for.
        </p>
      </div>

      {/* Button */}
      <Link 
        to="/"
        className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg rounded-lg shadow hover:bg-blue-600 transition"
      >
        Go back to Homepage
      </Link>
    </div>
  );
};
