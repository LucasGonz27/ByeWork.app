import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifySession, getCurrentUserRole } from '../utils/auth';
import { useNotificationContext } from '../contexts/NotificationContext';

const SessionChecker = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { showSuccess, showError } = useNotificationContext();

    useEffect(() => {
        const checkSessionOnLoad = async () => {
            // Pages publiques qui ne nécessitent pas d'authentification
            const publicPages = ['/', '/login', '/Signup', '/SearchOffers', '/SearchCompanies'];

            const pageRecruteur = "/publier-offre";
            const pageAdmin = "/admin";

            // Si la page nécessite un rôle recruteur ou admin, vérifier le rôle
            if (location.pathname === (pageRecruteur)) {
                const role = getCurrentUserRole();
                if (role == 'recruteur' || role == 'admin') {
                navigate(pageRecruteur);
            }
            else if (role == 'user') {
                navigate('/');
                console.log(navigate("/"));
                showError("Vous n'avez pas accès à cette page.");
            }
            else {
                navigate('/login');
                showError("Vous devez être connecté en tant que recruteur pour accéder à cette page.");
                return;
            }

            }

            // Si la page nécessite un rôle admin uniquement
            if (location.pathname === pageAdmin) {
                const role = getCurrentUserRole();
                console.log('SessionChecker - Tentative d\'accès à /admin avec le rôle:', role);
                if (role !== 'admin') {
                    console.log(' SessionChecker - Accès refusé, redirection vers /');
                    navigate('/');
                    showError("Accès refusé. Seuls les administrateurs peuvent accéder à cette page.");
                    return;
                } else {
                    console.log(' SessionChecker - Accès autorisé à /admin');
                }
            }

            // Vérifier si on est sur une page publique
            const isPublicPage = publicPages.includes(location.pathname) || 
                                location.pathname.startsWith('/companie/') || 
                                location.pathname.startsWith('/offer/');
            
            if (isPublicPage) {
                return;
            }

            // Pour les autres pages, vérifier la session
            const isValid = await verifySession();
            if (!isValid) {
                // Si pas de session valide, rediriger vers login
                navigate('/login');
            }
        };

        checkSessionOnLoad();
    }, [navigate, location.pathname]);

    return children;
};

export default SessionChecker;
