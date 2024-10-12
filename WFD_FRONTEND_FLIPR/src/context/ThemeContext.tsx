import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createTheme, ThemeProvider, Theme } from '@mui/material/styles';

// Define a type for the theme context
interface ThemeContextType {
  toggleTheme: () => void;
  mode: 'light' | 'dark';
}

// Create a context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Create a provider component
export const ThemeProviderComponent: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    // Initialize the theme from localStorage or default to 'light'
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newMode); // Store the updated mode in localStorage
      return newMode;
    });
  };

  // Create a theme based on the current mode
  const theme: Theme = createTheme({
    palette: {
      mode,
    },
  });

  // Sync with localStorage when mode changes
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme && storedTheme !== mode) {
      setMode(storedTheme as 'light' | 'dark');
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

// Create a custom hook for using the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
