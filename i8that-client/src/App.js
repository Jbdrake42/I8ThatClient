import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sitebar from './components/Sitebar';
import Home from './Home/Home';
import Auth from './Auth/Auth';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Uploading from './components/UploadPhoto';
import CalorieCounter from "./Home/CalorieCounter";
import {
  BrowserRouter as Router,
} from 'react-router-dom'

function App() {
  const [sessionToken, setSessionToken] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'));
    }
  }, []);

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  };

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  };

  const protectedViews = () => {
    return sessionToken === localStorage.getItem('token') ? (
      <Home token={sessionToken} />
    ) : (
      <Auth updateToken={updateToken} />
    );
  };

  return (
    <div className="main">
      <Header />
      <div>
        <Router>
        <Sitebar clickLogout={clearToken} />
        {protectedViews()}
        </Router>
        <Uploading />
        <CalorieCounter />
        <Home />
      </div>
    </div>
  );
}

export default App;
