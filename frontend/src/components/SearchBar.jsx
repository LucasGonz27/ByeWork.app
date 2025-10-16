import { useState } from 'react';
import styles from './SearchBar.module.css';
import Logo from '../assets/loupe.png';


// Gère la mise à jour de la valeur du champ de recherche lors de la saisie de l'utilisateur.
function SearchBar({ onSearch, placeholder = "Rechercher..." }) {
  const [searchTerm, setSearchTerm] = useState("");


  // Met à jour l'état du terme de recherche à chaque changement dans le champ de saisie.
  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  // Soumet le formulaire de recherche et appelle la fonction onSearch avec le terme de recherche.
  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  // Déclenche la soumission quand appuie sur Entrée
  const handleKeyDown = (event) => {
    if (event.key === "Enter") handleSubmit(event);
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <div className={styles.searchBar}>
          {/* Icône de recherche */}
          <img src={Logo} alt="Rechercher" className={styles.searchIcon} />

          {/* Champ de saisie de recherche */}
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleSearchTerm}
            onKeyDown={handleKeyDown}
            className={styles.searchInput}
          />
        </div>

        {/* Bouton de soumission */}
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
