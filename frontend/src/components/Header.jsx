import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './Header.module.css';
import Logo from '../assets/LogoByeWork.png';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const isLoginPage = location.pathname === '/Login';

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };


    // Ne pas afficher le header sur la page de login
    if (isLoginPage) {
        return null;
    }

    return (
        <nav className={styles.header}>
            {/* Logo à gauche */}
            <Link to="/" className={styles.logo}>
                <img src={Logo} alt="Logo ByeWork" />
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
                <div className={styles.Connexion}>
                    <Link to="/Login" onClick={closeMenu}>Connexion</Link>
                </div>
                <span className={styles.separator}>|</span>
                <Link to="#" onClick={closeMenu}>Entreprises / publier une offre</Link>
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
