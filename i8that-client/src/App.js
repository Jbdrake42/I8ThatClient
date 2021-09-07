import React, {useState, useEffect} from "react";
import './App.css';
import './Components/Header'
import Header from './Components/Header';
import Sitebar from './Components/Sitebar';
import Home from './Home/Home';
import FoodIndex from "./Food/FoodIndex";
import Auth from "./Auth/Auth";

function App() {
  const [sessionToken, setSessionToken] = useState("");

  useEffect(() => { //2
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
    return (sessionToken === localStorage.getItem("token") ? <FoodIndex token={sessionToken} />
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