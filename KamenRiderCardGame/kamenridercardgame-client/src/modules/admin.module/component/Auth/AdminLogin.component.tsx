import React, { useEffect, useState } from 'react';
import './Auth.component.css';
import { useAuth } from '../../../user.module/component/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated,login } = useAuth();

  const navigator = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username, password);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigator('/admin');
    }
  }, [isAuthenticated]);

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">Admin Login</h2>
        <div className="form-group">
          <label htmlFor="username" className="form-label">Email</label>
          <input
            type="text"
            id="username"
            className="form-input"
            value={username}
            onChange={(e) => setEmail(e.target.value)}
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
      </form>
    </div>
  );
};

export default AdminLogin;