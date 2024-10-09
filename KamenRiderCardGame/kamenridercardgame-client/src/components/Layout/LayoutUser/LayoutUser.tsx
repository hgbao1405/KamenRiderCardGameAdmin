import React, { FC, useState } from 'react';
import './LayoutUser.css';
import { useAuth } from '../../../modules/user.module/component/Auth/AuthContext';
import { Link } from 'react-router-dom';

const LayoutUser: FC<{children: React.ReactNode}> = ({children}) => {
  const [showMenu, setShowMenu] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
  <div className="LayoutUser">
  <header className="header">
      <h1>My App Header</h1>
      {
        isAuthenticated ? (
          <div className="login-menu">
            <button className="login-menu-button" onClick={toggleMenu}>
              Hello,{user?.username}! ▼
            </button>
            {showMenu && (
              <div className="login-dropdown w-full">
                <a onClick={logout} className="login-option">Logout</a>
                {user?.roles?.find((role) => role.toLowerCase() === 'admin') && <Link to="/admin" className="login-option">Manager</Link>}
              </div>
            )}
          </div>
        ) : (
          <div className="login-menu">
            <button className="login-menu-button" onClick={toggleMenu}>
              Login ▼
            </button>
            {showMenu && (
              <div className="login-dropdown">
                <a href="/login" className="login-option">Login</a>
                <a href="/register" className="login-option">Register</a>
              </div>
            )}
          </div>
        )
      }
  </header>
  <main className=".main-content-user">{children}</main>
  <footer className="footer">
      <p>My App Footer</p>
  </footer>
</div>
)};

export default LayoutUser;
