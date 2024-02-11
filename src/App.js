import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { HomeLayout } from './components/HomeLayout';
import config from './components/config';

function App() {
  console.log("config", config)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout configKey="Home" {...config} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
