import styles from './SearchBar.module.css';
import Logo from '../assets/loupe.png';

function SearchBar() {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBar}>
        <img src={Logo} alt="Logo" />
        <input type="text" placeholder="Rechercher un job" />
      </div>
      <div className={styles.btnRechercher}>
         <button type="submit">RECHERCHER</button>
      </div>
    </div>
  );
}

export default SearchBar;
