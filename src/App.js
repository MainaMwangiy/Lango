import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { HomeLayout } from './components/HomeLayout';
import config from './components/config';
import { AuthLayout } from './components/AuthLayout';
import { MainLayout } from './components/MainLayout';
import PrivateRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout configKey="Home" {...config} />} />
        <Route path="/Login" element={<AuthLayout />} />
        <Route path="/Main" element={<PrivateRoute authenticated={true} component={MainLayout} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
