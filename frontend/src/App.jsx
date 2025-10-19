import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Offers from './pages/Offers';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Header from './components/Header';
import Companies from './pages/Companies';
import Footer from './components/Footer';
import PageCompanie from './pages/Page_companie';
import NotFound from './pages/NotFound';
import SessionChecker from './components/SessionChecker';
import NotificationContainer from './components/NotificationContainer';
import { NotificationProvider, useNotificationContext } from './contexts/NotificationContext';
import PublierOffre from './pages/Publier_offre';
import Postuler from './pages/Postuler';
import AdminPanel from './pages/AdminPanel';

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
            <Route path="/publier-offre" element={<PublierOffre />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/companie/:idEntreprise" element={<PageCompanie />} />
            <Route path="/postuler" element={<Postuler />} />
            <Route path="*" element={<NotFound />} />
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