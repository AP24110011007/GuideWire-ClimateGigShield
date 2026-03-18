import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Plans from './pages/Plans';
import Rewards from './pages/Rewards';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userEmail'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/user');
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('/login', { email, password });
      if (response.data.success) {
        localStorage.setItem('userEmail', email);
        setIsLoggedIn(true);
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <Router>
      <div className="app">
        {isLoggedIn && <Navigation onLogout={handleLogout} />}
        <Routes>
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? (
                <Dashboard user={user} refreshUser={fetchUserData} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/plans"
            element={
              isLoggedIn ? (
                <Plans user={user} refreshUser={fetchUserData} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/rewards"
            element={
              isLoggedIn ? (
                <Rewards user={user} refreshUser={fetchUserData} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
