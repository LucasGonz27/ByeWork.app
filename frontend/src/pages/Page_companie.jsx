import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Page_companie.module.css';
import { Calendar, MapPin, Briefcase, Mail, Phone } from "lucide-react";
import { formatNombre } from '../utils/formatNombre';

const assets = import.meta.glob('../assets/*', { eager: true, query: '?url', import: 'default' });

function PageCompanie() {
  const { idEntreprise } = useParams();
  const [entreprise, setEntreprise] = useState(null);
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntreprise = async () => {
      try {
        const url = `http://localhost:5000/ApiByeWork/entreprises/offres/${idEntreprise}`;
        const res = await fetch(url);
        const json = await res.json();

        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          // Les infos entreprise sont dans la première offre
          setEntreprise(json.data[0]);
          setOffres(json.data);
        } else {
          console.error('Aucune entreprise trouvée');
        }
      } catch (e) {
        console.error("Erreur lors de la récupération :", e);
      } finally {
        setLoading(false);
      }
    };
    fetchEntreprise();
  }, [idEntreprise]);


  if (loading) return <div className={styles.page}>Chargement...</div>;
  if (!entreprise) return <div className={styles.page}>Entreprise introuvable.</div>;

  const imageKey = entreprise.image;
  const imageSrc = imageKey ? assets[`../assets/${imageKey}`] : undefined;

  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        {/*colonne principale */}
        <div className={styles.mainCol}>

          {/*Carte Entreprise*/}
          <div className={styles.card}>
            {imageSrc && <img src={imageSrc} alt={`Logo ${entreprise.nomEntreprise}`} className={styles.logo} />}
            <h1 className={styles.title}>{entreprise.nomEntreprise}</h1>

            <div className={styles.tags}>
              {entreprise.adr_ville && (
                <span className={styles.tag}><MapPin className={styles.icon} />{entreprise.adr_ville}</span>
              )}
              {entreprise.annee_fondation && (
                <span className={styles.tag}><Calendar className={styles.icon} />{entreprise.annee_fondation}</span>
              )}
              {entreprise.taille && (
                <span className={styles.tag}><Briefcase className={styles.icon} />{formatNombre(entreprise.taille)} employés</span>
              )}
              {entreprise.chiffre_affaire && (
                <span className={styles.tag}>{formatNombre(entreprise.chiffre_affaire)} €</span>
              )}
            </div>
          </div>

          {/*À propos*/}
          {entreprise.descriptionEntreprise && (
            <div className={styles.card}>
              <div className={styles.sectionHeaderBar}>
                <span className={styles.sectionTiret}>→</span>
                <h2 className={styles.sectionHeaderText}>À propos</h2>
              </div>
              <div className={styles.descriptionBlock}>
                {entreprise.descriptionEntreprise}
              </div>
            </div>
          )}

          {/*Liste des offres*/}
          <div className={styles.card}>
            <div className={styles.sectionHeaderBar}>
              <span className={styles.sectionTiret}>→</span>
              <h2 className={styles.sectionHeaderText}>Offres de l’entreprise</h2>
            </div>

            <div className={styles.offresList}>
              {offres.map((offre) => (
                <div key={offre.idOffre} className={styles.offreCard}>
                  <h3 className={styles.offreTitle}>{offre.titre}</h3>
                  <p className={styles.offreDescription}>{offre.description_poste}</p>
                  <div className={styles.offreTags}>
                    <button className={styles.offreButton}><a href={`/offer/${offre.idOffre}`}>Voir l'offre</a></button>
                  
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* === Colonne droite (infos de contact) === */}
        <aside className={styles.sideCol}>
          <div className={styles.card}>
            <div className={styles.sectionHeaderBar}>
              <span className={styles.sectionTiret}>→</span>
              <h2 className={styles.sectionHeaderText}>Infos clés</h2>
            </div>
            <div className={styles.infoList}>
              {entreprise.emailEntreprise && (
                <div className={styles.infoRow}>
                  <Mail className={styles.inlineIcon} />
                  <a href={`mailto:${entreprise.emailEntreprise}`}>{entreprise.emailEntreprise}</a>
                </div>
              )}
              {entreprise.telephone && (
                <div className={styles.infoRow}>
                  <Phone className={styles.inlineIcon} />
                  <span>{entreprise.telephone}</span>
                </div>
              )}
              {(entreprise.adr_rue || entreprise.adr_postal || entreprise.adr_ville) && (
                <div className={styles.infoRow}>
                  <MapPin className={styles.inlineIcon} />
                  <span>
                    {entreprise.adr_rue ? `${entreprise.adr_rue}, ` : ''}
                    {entreprise.adr_postal ? `${entreprise.adr_postal} ` : ''}
                    {entreprise.adr_ville || ''}
                  </span>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default PageCompanie;
