import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Offers from './pages/Offers';
import Signup from './pages/Signup';
import Header from './components/Header';
import Companies from './pages/Companies';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SearchOffers" element={<Offers />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/SearchCompanies" element={<Companies />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
