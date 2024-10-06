// AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import AuthService, { User } from '../../../../service/auth.service';
import MessageService from '../../../../service/message.service';
import AuthToken from '../../../../service/authToken.service';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>('');

  const login = (username: string, password: string) => {
    const token2=AuthService.Login({ username: username, password: password }).then((data) => {
      setToken(data);
      AuthToken.setToken(data);
      AuthService.GetInfor(data).then((user) => {
        if (user) {
          setUser(user);
          console.log(user);
        }else{
          MessageService.error("Login failed");
          logout();
        }
      });
    });
  };

  const logout = () => {
    setUser(null);
    setToken('');
    AuthToken.clearToken();
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
