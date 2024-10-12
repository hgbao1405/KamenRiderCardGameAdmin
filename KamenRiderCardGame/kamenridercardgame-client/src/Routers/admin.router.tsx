import { Routes, Route } from 'react-router-dom';
import * as admin from '../modules/admin.module/admin.module';
import React from 'react';
import LayoutAdmin from '../components/Layout/LayoutAdmin/LayoutAdmin';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';

const AdminRouter: React.FC = () => {
  return (
      <LayoutAdmin title="Admin">
        <Routes>
          <Route element={<PrivateRoute isAdmin={true} allowedRoles={['admin']} />}>
            <Route path="/" element={<admin.AdminHome />} />
            <Route path="/characters" element={<admin.ShowCharacters />} />
            <Route path="/forms" element={<admin.ShowForm />} />
          </Route>
          
          <Route path="/card-creator" element={<admin.CardCreator />} />
        </Routes>
      </LayoutAdmin>
  );
};

export default AdminRouter;