import React, { useState } from 'react';
import '../../../admin.module/component/Auth/Auth.component.css';
import AuthService, { Regrister } from '../../../../service/auth.service';
import MessageService from '../../../../service/message.service';

const Register: React.FC = () => {
  const [regristers, setRegristers] = useState<Regrister>({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRegristers(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (regristers.password !== regristers.confirmPassword) {
        MessageService.error("Passwords don't match");
        return;
      }
      // Xử lý đăng ký ở đây
      var rs = await AuthService.Register(regristers);
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">Register</h2>
        <div className="form-group">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-input"
            value={regristers.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            value={regristers.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="form-input"
            value={regristers.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="form-button">Register</button>
        <a href="/login" className="form-link">Already have an account? Login here</a>
      </form>
    </div>
  );
};

export default Register;