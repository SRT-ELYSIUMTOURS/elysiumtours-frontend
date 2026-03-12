import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TouristLayout from './layout/TouristLayout';
import AdminLayout from './layout/AdminLayout';

// Pages
import Home from './pages/tourist/Home';
import Showcase from './pages/Showcase';
import Dashboard from './pages/admin/Dashboard';
import Login from './pages/admin/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Tourist Routes */}
        <Route element={<TouristLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/showcase" element={<Showcase />} />
          {/* Add more tourist pages here */}
        </Route>

        {/* Admin Routes (Protected) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          {/* Add more admin pages here */}
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
