import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminRouter from './Routers/admin.router';
import UserRouter from './Routers/user.router';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="*" element={<UserRouter />} />
          <Route path="/admin/*" element={<AdminRouter />} />
        </Routes>
      </Router>
  );
}

export default App;
