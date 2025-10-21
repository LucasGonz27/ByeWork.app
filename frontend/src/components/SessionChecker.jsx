import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifySession, getCurrentUserRole } from '../utils/auth';
import { useNotificationContext } from '../contexts/NotificationContext';

const SessionChecker = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { showError } = useNotificationContext();

    useEffect(() => {
        const checkSessionOnLoad = async () => {
            const publicPages = ['/', '/login', '/Signup', '/SearchOffers', '/SearchCompanies'];
            const pageRecruteur = "/publier-offre";
            const pageAdmin = "/admin";

            // Pages publiques donc pas de verif
            const isPublicPage = publicPages.includes(location.pathname) || 
                                 location.pathname.startsWith('/companie/') || 
                                 location.pathname.startsWith('/offer/');
            if (isPublicPage) return;

            // Vérif les page privées
            const isValid = await verifySession();
            if (!isValid) {
                navigate('/login');
                return;
            }

            const role = getCurrentUserRole();

            // Page recruteur accessible uniquement aux recruteurs et admins
            if (location.pathname === pageRecruteur && !(role === 'recruteur' || role === 'admin')) {
                showError("Vous n'avez pas accès à cette page.");
                navigate('/');
                return;
            }

            // Page admin accessible uniquement aux admins sinon 404 car t'es un voleur
            if (location.pathname === pageAdmin && role !== 'admin') {
                navigate('/404'); 
                return;
            }

          
        };

        checkSessionOnLoad();
    }, [navigate, location.pathname]);

    return children;
};

export default SessionChecker;
