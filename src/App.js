import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { HomeLayout } from './components/HomeLayout';
import config from './components/config';
import { AuthLayout } from './components/AuthLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout configKey="Home" {...config} />} />
        <Route path="/Login" element={<AuthLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
