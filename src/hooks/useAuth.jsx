// src/hooks/useAuth.jsx
import { useState, useEffect, createContext, useContext } from 'react';

// Create Auth Context
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hardcoded credentials
  const ADMIN_CREDENTIALS = {
    email: 'admin@kadcoslubaga.co.ug',
    password: '@Student1705'
  };

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check against hardcoded credentials
      if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        const userData = { 
          id: 1, 
          email: email,
          name: 'KADCOS Admin',
          role: 'admin'
        };
        setUser(userData);
        localStorage.setItem('admin_user', JSON.stringify(userData));
        return { error: null, user: userData };
      } else {
        return { error: { message: 'Invalid email or password' } };
      }
    } catch (error) {
      return { error: { message: 'Login failed. Please try again.' } };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('admin_user');
  };

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('admin_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('admin_user');
      }
    }
    setLoading(false);
  }, []);

  const value = {
    user,
    loading,
    signIn,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};