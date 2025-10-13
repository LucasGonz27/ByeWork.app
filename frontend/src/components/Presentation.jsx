import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Presentation.module.css';
import { FiTarget, FiSearch } from 'react-icons/fi';
import { FaHandshake } from 'react-icons/fa';

function Presentation() {
  const [nbOffres, setNbOffres] = useState(0);
  const [nbEntreprises, setNbEntreprises] = useState(0);

  useEffect(() => {
    // Récupération du nombre d'offres
    const fetchOffres = async () => {
      try {
        const response = await fetch("http://localhost:5000/ApiByeWork/offres");
        const json = await response.json();
        if (json.success) {
          setNbOffres(json.count);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des offres:", error);
      }
    };

    // Récupération du nombre d'entreprises
    const fetchEntreprises = async () => {
      try {
        const response = await fetch("http://localhost:5000/ApiByeWork/entreprises");
        const json = await response.json();
        if (json.success) {
          setNbEntreprises(json.data.length);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des entreprises:", error);
      }
    };

    fetchOffres();
    fetchEntreprises();
  }, []);

  return (
    <section className={styles.presentationSection}>
      <div className={styles.container}>
        <div className={styles.textBlock}>
          <h2>Pourquoi ByeWork ?</h2>
          <p>
            Découvrez des offres sélectionnées avec soin, des entreprises transparentes,
            et une expérience de recherche pensée pour vous. Notre mission: vous aider
            à trouver le job qui vous correspond vraiment.
          </p>
          <div className={styles.features}>
            <div className={styles.featureCard}>
              <span className={styles.featureEmoji}><FiTarget /></span>
              <div>
                <h3>Offres pertinentes</h3>
                <p>Des résultats personnalisés selon vos préférences.</p>
              </div>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.featureEmoji}><FiSearch /></span>
              <div>
                <h3>Recherche fluide</h3>
                <p>Filtres clairs et expérience rapide sur mobile.</p>
              </div>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.featureEmoji}><FaHandshake /></span>
              <div>
                <h3>Entreprises engagées</h3>
                <p>Transparence sur les missions, salaires et avantages.</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.mediaBlock}>
          <div className={styles.mockupCard}>
            <div className={styles.mockupHeader}>
              <span></span><span></span><span></span>
            </div>
            <div className={styles.mockupBody}>
              <div className={styles.mockupHero}>
                <h4 className={styles.heroTitle}>Trouve ton futur job</h4>
                <div className={styles.heroActions}>
                  <Link to="/SearchOffers" className={styles.mockupBtnPrimary}>Voir les offres</Link>
                  <Link to="/SearchCompanies" className={styles.mockupBtnGhost}>Découvrir les entreprises</Link>
                </div>
                <ul className={styles.heroChecklist}>
                  <li><span>✓</span> Matching intelligent</li>
                  <li><span>✓</span> Filtrage rapide</li>
                  <li><span>✓</span> Profil confidentiel</li>
                </ul>
              </div>

              <div className={styles.mockupDivider}></div>

              <div className={styles.mockupStats}>
                <div>
                  <strong>+{nbOffres.toLocaleString()}</strong>
                  <span>offres actives</span>
                </div>
                <div>
                  <strong>+{nbEntreprises.toLocaleString()}</strong>
                  <span>entreprises</span>
                </div>
                <div>
                  <strong>24h</strong>
                  <span>mise à jour</span>
                </div>
              </div>

              <div className={styles.mockupBadges}>
                <span className={styles.badgePill}>Tech</span>
                <span className={styles.badgePill}>Design</span>
                <span className={styles.badgePill}>Marketing</span>
                <span className={styles.badgePill}>Remote</span>
              </div>

              <div className={styles.mockupKpi}>
                <div className={styles.kpiHeader}>
                  <span>Taux de matching</span>
                  <strong>82%</strong>
                </div>
                <div className={styles.kpiBar}>
                  <div className={styles.kpiFill} style={{width: '82%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Presentation;


