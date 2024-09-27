import { Routes, Route } from 'react-router-dom';
import { Home } from '../modules/user.module/user.module';
import React from 'react';
import LayoutUser from '../components/Layout/LayoutUser/LayoutUser';

const UserRouter: React.FC = () => {
  return (
    <LayoutUser>
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    </LayoutUser>
  );
};

export default UserRouter;