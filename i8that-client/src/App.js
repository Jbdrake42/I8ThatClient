import React, {useState, useEffect} from "react";
import Header from './Components/Header';
import Sitebar from './Components/Sitebar';
import Home from './Home/Home';
import Auth from "./Auth/Auth";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [sessionToken, setSessionToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, [])

  const updateToken = (newToken) => { //3
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  }

  const clearToken = () => {
    localStorage.clear();
    setSessionToken("");
  }

  const protectedViews = () => {
    return (sessionToken === localStorage.getItem("token") ? <Home token={sessionToken} />
    : <Auth updateToken={updateToken} />)
  }

  return (
    <div className="main">
      <Header />
      <div>
        <Sitebar clickLogout={clearToken} />
        {protectedViews()}
        <Home />
      </div>
    </div>
  );
};

export default App;
