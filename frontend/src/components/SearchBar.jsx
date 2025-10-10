import { useState } from 'react';
import styles from './SearchBar.module.css';
import Logo from '../assets/loupe.png';

function SearchBar({ onSearch, placeholder = "Rechercher..." }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") handleSubmit(event);
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <div className={styles.searchBar}>
          {/* Icône de loupe */}
          <img src={Logo} alt="Rechercher" className={styles.searchIcon} />

          {/* Champ de saisie */}
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleSearchTerm}
            onKeyDown={handleKeyDown}
            className={styles.searchInput}
          />
        </div>

        {/* Bouton de recherche */}
        <button
          type="submit"
          className={styles.searchButton}
        >
          RECHERCHER
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
