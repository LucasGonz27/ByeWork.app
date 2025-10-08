import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './Header.module.css';
import Logo from '../assets/LogoByeWork.png';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // Fermer le menu avec la touche Escape
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                closeMenu();
            }
        };

        if (isMenuOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isMenuOpen]);

    return (
        <nav className={styles.header}>
            {/* Logo à gauche */}
            <Link to="/" className={styles.logo}>
                <img src={Logo} alt="Logo ByeWork" />
            </Link>

            {/* Overlay pour fermer le menu */}
            {isMenuOpen && <div className={styles.overlay} onClick={closeMenu}></div>}

            {/* Conteneur pour les liens à droite */}
            <div className={`${styles.navLinks} ${isMenuOpen ? styles.mobileMenu : ''}`}>
                <Link to="/offers" onClick={closeMenu}>Trouver un job</Link>
                <span className={styles.separator}>|</span>
                <Link to="#" onClick={closeMenu}>Trouver une entreprise</Link>
                <span className={styles.separator}>|</span>
                <Link to="/signup" onClick={closeMenu}>Connexion</Link>
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
