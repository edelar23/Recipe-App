import React, { ReactNode, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  // Add more user-related fields if needed
}

interface AuthContextInterface {
  isAuthenticated: boolean;
  user: User | null; // User information
  login: (userData: User) => void;
  logout: () => void;
}

const storedUser = localStorage.getItem('user');
const storedAuth = localStorage.getItem('isAuthenticated');

const initialUser: User | null = storedUser ? JSON.parse(storedUser) : null;
const initialAuth: boolean = storedAuth ? JSON.parse(storedAuth) : false;

export const AuthContext = React.createContext<AuthContextInterface | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(initialAuth);
  const [user, setUser] = React.useState<User | null>(initialUser);

  useEffect(() => {
    // Save to localStorage when the state changes
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [user, isAuthenticated]);

  const login = (userData: User) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the useAuth hook for other components
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
