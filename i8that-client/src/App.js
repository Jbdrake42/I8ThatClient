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
    <div>
      <Container>
        <Row>
          <Col md="12">
            <div className="main">
              <Header />
            </div>
          </Col>
        </Row>

        <Router>
          <div>
            <Row>
              <Col md="3">
                <Sitebar clickLogout={clearToken} />{' '}
              </Col>
              <Col md="9">
                <CalorieCounter token={sessionToken} />
                {protectedViews()}{' '}
              </Col>
            </Row>{' '}
          </div>
        </Router>
      </Container>{' '}
    </div>
  );
}

export default App;
