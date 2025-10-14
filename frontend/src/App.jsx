import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Offers from './pages/Offers';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Header from './components/Header';
import Companies from './pages/Companies';
import Footer from './components/Footer';
import PageProduct from './pages/Page_offre';
import PageCompanie from './pages/Page_companie';
import SessionChecker from './components/SessionChecker';
import NotificationContainer from './components/NotificationContainer';
import { NotificationProvider, useNotificationContext } from './contexts/NotificationContext';

const AppContent = () => {
  const { notifications, removeNotification } = useNotificationContext();

  return (
    <>
      <SessionChecker>
        <Header />
        <main style={{ minHeight: '80vh' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/SearchOffers" element={<Offers />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/SearchCompanies" element={<Companies />} />
            <Route path="/offer/:id" element={<PageProduct />} />
            <Route path="/companie/:idEntreprise" element={<PageCompanie />} />
          </Routes>
        </main>
        <Footer />
      </SessionChecker>
      <NotificationContainer 
        notifications={notifications} 
        onRemove={removeNotification} 
      />
    </>
  );
};

function App() {
  return (
    <NotificationProvider>
      <Router>
        <AppContent />
      </Router>
    </NotificationProvider>
  );
}

export default App;