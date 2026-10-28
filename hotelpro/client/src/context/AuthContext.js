import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('hotelpro_user');
      return saved ? JSON.parse(saved) : { name: 'Sophia Sterling', email: 'guest@hotelpro.com', role: 'guest' };
    } catch (e) {
      return { name: 'Sophia Sterling', email: 'guest@hotelpro.com', role: 'guest' };
    }
  });

  const [role, setRole] = useState(user.role || 'guest');

  useEffect(() => {
    try {
      localStorage.setItem('hotelpro_user', JSON.stringify(user));
    } catch (e) {}
  }, [user]);

  const switchRole = (newRole) => {
    if (newRole === 'admin') {
      const adminUser = { name: 'General Manager (Admin)', email: 'admin@hotelpro.com', role: 'admin' };
      setUser(adminUser);
      setRole('admin');
    } else {
      const guestUser = { name: 'Sophia Sterling', email: 'guest@hotelpro.com', role: 'guest' };
      setUser(guestUser);
      setRole('guest');
    }
  };

  const login = (userData) => {
    setUser(userData);
    setRole(userData.role || 'guest');
  };

  const logout = () => {
    setUser({ name: 'Guest Visitor', email: 'visitor@hotelpro.com', role: 'guest' });
    setRole('guest');
  };

  return (
    <AuthContext.Provider value={{ user, role, switchRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
