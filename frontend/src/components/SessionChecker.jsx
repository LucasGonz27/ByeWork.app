import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifySession } from '../utils/auth';

const SessionChecker = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkSessionOnLoad = async () => {
            // Pages publiques qui ne nécessitent pas d'authentification
            const publicPages = ['/', '/login', '/Signup', '/SearchOffers', '/SearchCompanies'];

            const pageRecruteur = ["/publier-offre"];

            if (pageRecruteur.includes(location.pathname)) {
                if (localStorage.getItem('role') !== 'recruteur' && localStorage.getItem('role') !== 'admin') {
                    navigate('/login');
                    return;
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
