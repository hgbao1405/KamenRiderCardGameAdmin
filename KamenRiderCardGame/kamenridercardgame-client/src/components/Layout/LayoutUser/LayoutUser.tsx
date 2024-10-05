import React, { FC, useState } from 'react';
import './LayoutUser.css';

const LayoutUser: FC<{children: React.ReactNode}> = ({children}) => {
  const [showMenu, setShowMenu] = useState(false);
  
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
  <div className="LayoutUser">
  <header className="header">
      <h1>My App Header</h1>
      {
        localStorage.getItem('token') ? (
          <div className="login-menu">
            <button className="login-menu-button" onClick={toggleMenu}>
              Hello,{localStorage.getItem('username')}! ▼
            </button>
            {showMenu && (
              <div className="login-dropdown">
                <a href="/logout" className="login-option">Logout</a>
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
