import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { HomeLayout } from './components/HomeLayout';
import config from './components/config';
import { AuthLayout } from './components/AuthLayout';
import { MainLayout } from './components/MainLayout';
import PrivateRoute from './components/ProtectedRoute';
import version from '../package.json';
import NewVersionNotification from './NewVersionNotification';
import store from './redux/store';
import { Provider } from 'react-redux';
import NotificationLayout from './components/NotificationLayout';
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  const [isNewVersionAvailable, setIsNewVersionAvailable] = useState(false);
  const [versionDetails, setVersionDetails] = useState();

  useEffect(() => {
    async function checkForUpdates(currentVersion) {
      const url = `https://api.github.com/repos/MainaMwangiy/Lango/releases/latest`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setVersionDetails(data);
        const latestVersion = data.tag_name;
        const acknowledgedVersion = localStorage.getItem('acknowledgedVersion');
        if (latestVersion !== currentVersion && latestVersion !== acknowledgedVersion) {
          setIsNewVersionAvailable(true);
        } else {
          setIsNewVersionAvailable(false);
        }
      } catch (error) {
        console.error('Failed to check for updates:', error);
      }
    }
    checkForUpdates(version);
  }, []);

  const handleInstall = () => {
    if (versionDetails && versionDetails.tag_name) {
      localStorage.setItem('acknowledgedVersion', versionDetails.tag_name);
    }
    window.location.reload(true);
  };

  const handleCancel = () => {
    if (versionDetails && versionDetails.tag_name) {
      localStorage.setItem('acknowledgedVersion', versionDetails.tag_name);
    }
    setIsNewVersionAvailable(false);
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <SpeedInsights />
        {!navigator.onLine && isNewVersionAvailable && <NewVersionNotification onInstall={handleInstall} onCancel={handleCancel} />}
        <Routes>
          <Route path="/" element={<HomeLayout configKey="Home" version={versionDetails} {...config} />} />
          <Route path="/Login" element={<AuthLayout />} />
          <Route path="/Main" element={<PrivateRoute authenticated={true} component={MainLayout} />} />
          <Route path="/notifications" element={<PrivateRoute authenticated={true} component={NotificationLayout} />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
