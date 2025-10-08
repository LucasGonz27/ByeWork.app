import { Link } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  return (
    <nav className={styles.header}>
      <Link to="/">Accueil</Link>
      <Link to="/offers">Offres</Link>
      <Link to="/signup">Créer un compte</Link>
    </nav>
  );
}

export default Header;
