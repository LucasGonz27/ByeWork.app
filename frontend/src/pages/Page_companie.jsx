import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './Page_companie.module.css';

function PageCompanie() {
  let { idEntreprise } = useParams();
  return (
    <div className={styles.container}>
      <h1>Company ID: {idEntreprise}</h1>
    </div>
  );
}

export default PageCompanie;