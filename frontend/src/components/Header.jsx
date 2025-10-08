import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import Logo from '../assets/LogoByeWork.png';

function Header() {
    return (
        <nav className={styles.header}>
            {/* Logo à gauche */}
            <Link to="/" className={styles.logo}>
                <img src={Logo} alt="Logo ByeWork" />
            </Link>

            {/* Conteneur pour les liens à droite */}
            <div className={styles.navLinks}>
                <Link to="/">Accueil</Link>
                <Link to="/offers">Offres</Link>
                <Link to="#">Trouver une entreprise</Link>
                <Link to="/signup">Créer un compte</Link>
                <Link to="#">Publier une offre</Link>
            </div>
        </nav>
    );
}

export default Header;
