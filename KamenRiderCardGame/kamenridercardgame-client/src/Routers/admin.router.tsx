import { Routes, Route } from 'react-router-dom';
import { AdminHome, ShowCharacters } from '../modules/admin.module/admin.module';
import React from 'react';
import LayoutAdmin from '../components/Layout/LayoutAdmin/LayoutAdmin';

const AdminRouter: React.FC = () => {
  return (
      <LayoutAdmin>
        <Routes>
          <Route path="/" element={<AdminHome />} />
          <Route path="/characters" element={<ShowCharacters />} />
        </Routes>
      </LayoutAdmin>
  );
};

export default AdminRouter;