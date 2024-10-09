// AuthContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AuthService, { User } from '../../../../service/auth.service';
import MessageService from '../../../../service/message.service';
import AuthToken from '../../../../service/authToken.service';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  restoreUserFromStorage: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>('');
  const restoreUserFromStorage = () => {
    const storedUser = localStorage.getItem('user');
    const storedToken = AuthToken.getToken();
    const storedExpiresIn = AuthToken.getExpirationTime();
    
    if (storedUser && storedToken && storedExpiresIn) {
        AuthToken.setToken(storedToken, storedExpiresIn); // Khôi phục token và thời gian hết hạn
        if (!AuthToken.isTokenExpired()) { // Kiểm tra token còn hiệu lực không
            setUser(JSON.parse(storedUser));
        } else {
            logout(); // Token đã hết hạn, đăng xuất
        }
      }
    };
  
  useEffect(() => {
    restoreUserFromStorage();
  }, []);

  const login = (username: string, password: string) => {
    AuthService.Login({ username: username, password: password }).then((data) => {
      setToken(data);
      AuthService.GetInfor(data).then((user) => {
        if (user) {
          setUser(user);
          localStorage.setItem('user', JSON.stringify(user));
          AuthToken.setToken(data, user.expirationTime);
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
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated , restoreUserFromStorage }}>
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
