import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Offers from './pages/Offers';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <nav style={{ display: 'flex', gap: '20px', padding: '10px', background: '#eee' }}>
        <Link to="/">Accueil</Link>
        <Link to="/offers">Offres</Link>
        <Link to="/signup">Créer un compte</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
