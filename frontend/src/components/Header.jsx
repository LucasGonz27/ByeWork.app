import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import styles from './Header.module.css';
import Logo from '../assets/LogoByeWork.png';
import { isLoggedIn, getCurrentUser, logout, verifySession } from '../utils/auth';
import { useNotificationContext } from '../contexts/NotificationContext';

function Header() {
    const { showSuccess } = useNotificationContext();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const location = useLocation();

    const isLoginPage = location.pathname === '/login' || location.pathname === '/Signup';

    useEffect(() => {
        const checkSession = async () => {
            // Pages publiques où on ne vérifie pas la session
            const publicPages = ['/', '/login', '/Signup', '/SearchOffers', '/SearchCompanies'];
            
            // Si on est sur une page publique, vérifier seulement le localStorage
            if (publicPages.includes(location.pathname)) {
                if (isLoggedIn()) {
                    setUser(getCurrentUser());
                }
                return;
            }

            // Pour les autres pages, vérifier la session côté serveur
            if (isLoggedIn()) {
                const isValid = await verifySession();
                if (isValid) {
                    setUser(getCurrentUser());
                }
            }
        };
        
        checkSession();
    }, [location]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleLogout = async () => {
        const userName = user?.prenom || 'Utilisateur';
        
        // Afficher la notification de succès immédiatement
        showSuccess(`Au revoir ${userName} ! Déconnexion réussie.`);
        
        // Attendre un peu pour que la notification s'affiche
        setTimeout(async () => {
            await logout();
            setUser(null);
            closeMenu();
            
            // Rediriger vers la page d'accueil
            navigate('/');
        }, 100);
    };

    // Ne pas afficher le header sur la page de login
    if (isLoginPage) {
        return null;
    }

    return (
        <nav className={styles.header}>
            {/* Logo à gauche */}
            <Link to="/" className={styles.logo}>
                <img src={Logo} alt="Logo ByeWork"/>
            </Link>

            {/* Overlay pour fermer le menu */}
            {isMenuOpen && <div className={styles.overlay} onClick={closeMenu}></div>}

            {/* Bouton de fermeture (croix) qui renvoie à l'accueil */}
            {isMenuOpen && (
                <Link
                    to="/"
                    className={styles.closeButton}
                    onClick={closeMenu}
                    aria-label="Fermer le menu et revenir à l'accueil"
                >
                    <span>×</span>
                </Link>
            )}

            {/* Conteneur pour les liens à droite */}
            <div className={`${styles.navLinks} ${isMenuOpen ? styles.mobileMenu : ''}`}>
                <Link to="/SearchOffers" onClick={closeMenu}>Trouver un job</Link>
                <span className={styles.separator}>|</span>
                <Link to="/SearchCompanies" onClick={closeMenu}>Trouver une entreprise</Link>
                <span className={styles.separator}>|</span>
                {user ? (
                    <Link to="/profile" className={styles.userInfoLink}>
                        <div className={styles.userInfo}>
                            <span>Bonjour, {user.prenom}</span>
                            <span className={styles.userRole}>({user.role})</span>
                        </div>
                    </Link>
                ) : (
                    <div className={styles.Connexion}>
                        <Link to="/login" onClick={closeMenu}>Connexion</Link>
                    </div>
                )}
                <span className={styles.separator}>|</span>
                <Link to="#" onClick={closeMenu}>Entreprises / publier une offre</Link>
                {user && (
                    <>
                        <span className={styles.separator}>|</span>
                        <button onClick={handleLogout} className={styles.logoutButton}>
                            Déconnexion
                        </button>
                    </>
                )}
            </div>

            {/* Menu hamburger */}
            <div className={`${styles.menuHamburger} ${isMenuOpen ? styles.active : ''}`} onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    );
}

export default Header;