import React, { useEffect, useState } from 'react';
import '../../../admin.module/component/Auth/Auth.component.css';
import AuthService from '../../../../service/auth.service';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const UserLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login, isAuthenticated } = useAuth();

  var navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý đăng nhập user ở đây
    try {
      login(username, password);
    }catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">User Login</h2>
        <div className="form-group">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            id="username"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="form-button">Login</button>
        <a href="/register" className="form-link">Don't have an account? Register here</a>
      </form>
    </div>
  );
};

export default UserLogin;