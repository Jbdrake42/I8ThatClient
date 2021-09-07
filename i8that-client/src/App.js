import Header from './Components/Header';
import Sitebar from './Components/Sitebar';
import Home from './Home/Home';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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