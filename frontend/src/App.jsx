import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Offers from './pages/Offers';
import Signup from './pages/Signup';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />

      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      
     
    </Router>
  );
}

export default App;
