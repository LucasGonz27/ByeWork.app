import React from 'react';
import styles from './Home.module.css';
import SearchBar from '../components/SearchBar';
import Presentation from '../components/Presentation';
import JobboardSlider from '../components/JobboardSlider';

function Home() {
  return (
    <div className={styles.Home}>
      <div className={styles.TitreSection}>
        <h1>ByeWork, votre futur boss<br />vous dit merci !</h1>
        <p>Des milliers de jobs vous attendent... et aucun ne mord !</p>
        <SearchBar redirection="/SearchOffers" />
      </div>
      <Presentation />
      <JobboardSlider />

    </div>
  );
}

export default Home;
