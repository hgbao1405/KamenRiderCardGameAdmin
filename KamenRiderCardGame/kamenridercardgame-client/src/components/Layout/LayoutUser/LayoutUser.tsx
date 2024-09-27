import React, { FC } from 'react';
import './LayoutUser.css';

const LayoutUser: FC<{children: React.ReactNode}> = ({children}) => (
  <div className="LayoutUser">
  <header className="header">
      <h1>My App Header</h1>
  </header>
  <main className=".main-content-user">{children}</main>
  <footer className="footer">
      <p>My App Footer</p>
  </footer>
</div>
);

export default LayoutUser;
