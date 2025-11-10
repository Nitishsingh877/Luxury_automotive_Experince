import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginScreen from './components/LoginScreen';
import ExploreVehicles from './components/ExploreVehicles';
import Configurator from './components/Configurator';
import DealershipLocator from './components/DealershipLocator';
import MyGarage from './components/MyGarage';
import AccountSettings from './components/AccountSettings';


const API_BASE_URL = 'http://localhost:8080';

function App() {
  const [currentScreen, setCurrentScreen] = useState(() => {
    const savedToken = localStorage.getItem('token');
    return savedToken ? 'showcase' : 'login';
  });
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const handleLogin = (authToken, userData) => {
    setToken(authToken);
    setUser(userData);
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentScreen('showcase');
  };

  const handleLogout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentScreen('login');
  };

  const renderScreen = () => {
    if (!token) {
      return <LoginScreen onLogin={handleLogin} apiBaseUrl={API_BASE_URL} />;
    }

    switch (currentScreen) {
      case 'login':
        return <LoginScreen onLogin={handleLogin} apiBaseUrl={API_BASE_URL} />;
      case 'showcase':
        return <ExploreVehicles token={token} onNavigate={setCurrentScreen} />;
      case 'configurator':
        return <Configurator token={token} onNavigate={setCurrentScreen} />;
      case 'dealership':
        return <DealershipLocator token={token} onNavigate={setCurrentScreen} />;
      case 'garage':
        return <MyGarage token={token} onNavigate={setCurrentScreen} />;
      case 'account':
        return <AccountSettings token={token} onNavigate={setCurrentScreen} />;
      default:
        return <ExploreVehicles token={token} onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <main>{renderScreen()}</main>
    </div>
  );
}

export default App;
