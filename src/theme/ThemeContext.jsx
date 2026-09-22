import React, { createContext, useContext, useState } from 'react';
import { theme } from './theme';
 

// Create a context for the theme with a default value
export const ThemeContext = createContext(theme);

// ThemeProvider Component
export const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to access the theme
export const useTheme = () => {
  return useContext(ThemeContext);
};
