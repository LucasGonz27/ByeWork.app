import styles from './SearchBar.module.css';

function SearchBar() {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Rechercher un job" />
      </div>
      <button type="submit">RECHERCHER</button>
    </div>
  );
}

export default SearchBar;
