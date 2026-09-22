import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for validation
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../AuthSlice';
import { Navigate } from 'react-router-dom';

export const Protected = ({ children }) => {
  const loggedInUser = useSelector(selectLoggedInUser);

  // Check if the user is verified
  if (loggedInUser?.isVerified) {
    return children; // Render protected content
  }

  // Redirect to login page if not verified
  return <Navigate to="/login" replace />;
};

// PropTypes validation
Protected.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children is a valid React node
};
