import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminRouter from './Routers/admin.router';
import UserRouter from './Routers/user.router';
import { AdminLogin } from './modules/admin.module/admin.module';
import { Register, UserLogin } from './modules/user.module/user.module';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="*" element={<UserRouter />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminRouter />} />
        </Routes>
        
        <Toaster />
      </Router>
  );
}

export default App;
