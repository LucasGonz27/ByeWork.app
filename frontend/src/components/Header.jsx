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
                <Link to="/offers">Trouver un job</Link>
                <span className={styles.separator}>|</span>
                <Link to="#">Trouver une entreprise</Link>
                <span className={styles.separator}>|</span>
                <Link to="/signup">Connexion</Link>
                <span className={styles.separator}>|</span>
                <Link to="#">Entreprises / publier une offre</Link>
            </div>
        </nav>
    );
}

export default Header;
