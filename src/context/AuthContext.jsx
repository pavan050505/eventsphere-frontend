import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize user from local storage on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('eventsphere_current_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        localStorage.removeItem('eventsphere_current_user');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Helper to get all users from "DB"
  const getUsers = () => {
    const users = localStorage.getItem('eventsphere_users');
    return users ? JSON.parse(users) : [];
  };

  const signup = async (data) => {
    setLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const { email, password, firstName, lastName } = data;
    const users = getUsers();

    if (users.find(u => u.email === email)) {
      setLoading(false);
      throw new Error('User already exists with this email');
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password, // In a real app, never store plain passwords!
      firstName,
      lastName,
      avatar: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=0D8ABC&color=fff`,
      city: '',
      bio: ''
    };

    users.push(newUser);
    localStorage.setItem('eventsphere_users', JSON.stringify(users));
    
    // Auto login after signup
    const { password: _, ...userWithoutPassword } = newUser;
    localStorage.setItem('eventsphere_current_user', JSON.stringify(userWithoutPassword));
    setUser(userWithoutPassword);
    setLoading(false);
    return userWithoutPassword;
  };

  const login = async (email, password) => {
    setLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const users = getUsers();
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (!foundUser) {
      setLoading(false);
      throw new Error('Invalid email or password');
    }

    const { password: _, ...userWithoutPassword } = foundUser;
    localStorage.setItem('eventsphere_current_user', JSON.stringify(userWithoutPassword));
    setUser(userWithoutPassword);
    setLoading(false);
    return userWithoutPassword;
  };

  const logout = async () => {
    localStorage.removeItem('eventsphere_current_user');
    setUser(null);
  };

  const updateUser = async (data) => {
    const currentUser = user;
    if (!currentUser) throw new Error('No user logged in');

    const updatedUser = { ...currentUser, ...data };
    
    // Update in current session
    setUser(updatedUser);
    localStorage.setItem('eventsphere_current_user', JSON.stringify(updatedUser));

    // Update in "DB"
    const users = getUsers();
    const index = users.findIndex(u => u.id === currentUser.id);
    if (index !== -1) {
      users[index] = { ...users[index], ...data };
      localStorage.setItem('eventsphere_users', JSON.stringify(users));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
