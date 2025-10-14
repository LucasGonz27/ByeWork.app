import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Offers from './pages/Offers';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Header from './components/Header';
import Companies from './pages/Companies';
import Footer from './components/Footer';
import PageProduct from './pages/Page_offre';
import PageCompanie from './pages/Page_companie';

function App() {
  return (
    <Router>
      <Header />
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SearchOffers" element={<Offers />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SearchCompanies" element={<Companies />} />
          <Route path="/offer/:id" element={<PageProduct />} />
          <Route path="/companie/:idEntreprise" element={<PageCompanie />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;