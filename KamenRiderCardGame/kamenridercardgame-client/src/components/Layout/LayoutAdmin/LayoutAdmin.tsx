import React, { FC } from 'react';
import './LayoutAdmin.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from '../../../modules/user.module/component/Auth/AuthContext';

const routeNames:{ [key: string]: string } = {
  '/admin': 'Admin Home',
  '/admin/characters': 'List Characters',
};

const LayoutAdmin: FC<{children: React.ReactNode}> = ({children}) =>
{
  const { user, logout } = useAuth();
  const location = useLocation();
  const routeName = routeNames[location.pathname.toLowerCase()];
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/');
    logout();
  };
  return  (
    <div className="admin-layout">
            <aside className="sidebar">
                <h2>Hello {user?.username}!</h2>
                <nav>
                    <ul>
                        <li><Link to="/admin">Dashboard</Link></li>
                        <li><Link to="characters">Characters</Link></li>
                        <li><Link to="forms">forms</Link></li>
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </ul>
                </nav>
            </aside>
            <div className="main-content h-screen">
                <header className="topbar fixed top-0 right-0 left-[251px] flex items-center">
                    <h2>{routeName}</h2>
                    <div className="topbar-actions">
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </header>
                <main className='mt-[70px]'>{children}</main>
            </div>
        </div>
  );
}

export default LayoutAdmin;
