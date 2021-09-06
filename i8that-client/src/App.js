import './components/Header';
import Header from './components/Header';
import Sitebar from './components/Sitebar';
import Home from './Home/Home';
import './App.css';
function App() {
  return (
    <div className="main">
      <Header />
      <div>
        <Sitebar />
        <Home />
      </div>
    </div>
  );
}

export default App;
