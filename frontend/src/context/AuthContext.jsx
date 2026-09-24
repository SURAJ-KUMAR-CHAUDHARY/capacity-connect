import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockUser = localStorage.getItem('mockUser');
    if (mockUser) {
      setUser(JSON.parse(mockUser));
    }
    setLoading(false);
  }, []);

  const setMockUser = (mockUserData) => {
    setUser(mockUserData);
    localStorage.setItem('mockUser', JSON.stringify(mockUserData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mockUser');
  };

  return (
    <AuthContext.Provider value={{ user, loading, setMockUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
