import { Routes, Route } from 'react-router-dom';
import * as admin from '../modules/admin.module/admin.module';
import React from 'react';
import LayoutAdmin from '../components/Layout/LayoutAdmin/LayoutAdmin';

const AdminRouter: React.FC = () => {
  return (
      <LayoutAdmin>
        <Routes>
          <Route path="/" element={<admin.AdminHome />} />
          <Route path="/characters" element={<admin.ShowCharacters />} />
          <Route path="/forms" element={<admin.ShowForm />} />
        </Routes>
      </LayoutAdmin>
  );
};

export default AdminRouter;