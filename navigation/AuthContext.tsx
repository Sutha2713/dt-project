import React, { createContext, useState, useContext, ReactNode } from 'react';

// User interface
export interface User {
  username: string;
  email: string;
  name: string;
  designation: string;
  age: string;
  contactNo: string;
  profileImage?: string;
  password?: string; 
}

// Auth context interface
interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
});

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  //const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const login = (userData: User) => {
    setUser(userData);
    //setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
   // setIsLoggedIn(false);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);