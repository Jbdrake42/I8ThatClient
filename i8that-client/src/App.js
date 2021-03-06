import React, { useState, useEffect } from 'react';
import Header from './Components/Header';
import Sitebar from './Components/Sitebar';
import Home from './Home/Home';
import Auth from './Auth/Auth';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Uploading from './Components/UploadPhoto';
import CalorieCounter from './Home/CalorieCounter';
import { Container, Row, Col } from 'reactstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import CreateFood from './Components/CreateFood';
import Quote from './Components/Quotes/InspirationalQuote';

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
      <div>
        <CalorieCounter token={sessionToken} />
        <Home token={sessionToken} />
      </div>
    ) : (
      <Auth updateToken={updateToken} />
    );
  };
  const protectedViewSide = () => {
    return sessionToken === localStorage.getItem('token') ? (
      <div>
        <Sitebar clickLogout={clearToken} /> <CreateFood token={sessionToken} />
        <Quote />
      </div>
    ) : (
      ' '
    );
  };

  return (
    <div>
      <Header />
        <Router>
          <div>
            <Row>
              <div class="sidebar">
              <Col md="25">{protectedViewSide()} </Col>
              <div class="footer">Copyright &copy; 2021</div>
              </div>
              <div class="wrapper">
              <Col md="9">{protectedViews()} </Col>
              </div>
            </Row>
          </div>
        </Router>
      </div>
  );
}

export default App;
