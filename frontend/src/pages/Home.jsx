import React from 'react';
import styles from './Home.module.css';
import SearchBar from '../components/SearchBar';

function Home() {
  return (
    <div className={styles.Home}>
      <div className={styles.TitreSection}>
        <h1>ByeWork, votre futur boss<br />vous dit merci !</h1>
        <p>Des milliers de jobs vous attendent... et aucun ne mord !</p>
        <SearchBar />
      </div>
    </div>
  );
}

export default Home;
