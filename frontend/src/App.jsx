import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Offers from './pages/Offers';
import Signup from './pages/Signup';
import Header from './components/Header';
import Companies from './pages/Companies';

function App() {
  return (
    <Router>
      <Header />

      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SearchOffers" element={<Offers />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/SearchCompanies" element={<Companies />} />
      </Routes>
      
     
    </Router>
  );
}

export default App;
