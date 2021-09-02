
import './App.css';
import './components/Header'
import Header from './components/Header';
import Sitebar from './components/Sitebar';
function App() {
  return (
    <div className="main">
      <Header />
      <div>
        <Sitebar />
      </div>
    </div>
  );
}

export default App;
