import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.subtitle}>Oups, cette page n'existe pas.</p>
        <Link to="/" className={styles.homeButton}>Retour à l'accueil</Link>
      </div>
    </div>
  );
}

export default NotFound;


