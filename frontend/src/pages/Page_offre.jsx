import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Page_offre.module.css';
import { Calendar, FileText, MapPin, Briefcase, Euro } from "lucide-react";
import { formatNombre } from '../utils/formatNombre'; 
const assets = import.meta.glob('../assets/*', { eager: true, query: '?url', import: 'default' });

function PageOffre() {
  const { id } = useParams();
  const [offre, setOffre] = useState(null);

  useEffect(() => {
    const fetchOffresId = async () => {
      try {
        const url = `http://localhost:5000/ApiByeWork/offres/id/${id}`;
        const fetcher = await fetch(url);
        const json = await fetcher.json();
        if (json.success) {
          setOffre(json.data);
        } else {
          console.error("Erreur API:", json.message);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'offre avec son id:", error);
      }
    };
    fetchOffresId();
  }, [id]);

  if (!offre) return <div>Chargement...</div>;

  // Récupération de l'entreprise depuis l'offre
  const entreprise = offre.entreprise || {};

  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        <div className={styles.mainCol}>
          <div className={styles.card}>
            <div className={styles.cardTop}></div>
            <img
              src={assets[`../assets/${offre.image}`]}
              alt={`Image de l'entreprise ${entreprise.nom || ''}`}
            />
            <h1 className={styles.title}>{offre.titre}</h1>
            <div className={styles.tags}>
              <span className={styles.tag}>
                <MapPin className={styles.icon} />
                {offre.lieu}
              </span>
              <span className={styles.tag}>
                <Briefcase className={styles.icon} />
                {offre.type_contrat}
              </span>
              <span className={styles.tag}>
                {formatNombre(offre.salaire_min)}€ -{" "}
                {formatNombre(offre.salaire_max)}€
              </span>
              {offre.tags &&
                offre.tags
                  .split(",")
                  .slice(0, 8)
                  .map((t, i) => (
                    <span key={i} className={styles.tag}>
                      {t.trim()}
                    </span>
                  ))}
            </div>
            <div className={styles.btn}>
              <a href={`/postuler?offre=${id}`}>
              <button className={styles.primaryBtn}>Postuler</button>
              </a>
              <button className={styles.secondaryBtn}>Sauvegarder</button>
            </div>
          </div>

          {/* Informations sur le poste et details */}
          <div className={styles.card}>
            <div className={styles.sectionHeaderBar}>
              <span className={styles.sectionTiret}>→</span>
              <h2 className={styles.sectionHeaderText}>Le poste</h2>
            </div>
            <div className={styles.detailsList}>
            
                  <h2>Description du poste</h2>
                  <div className={styles.descriptionBlock}>{offre.description_poste}</div>
         
             
                  <h2>Vos missions</h2>
                  <div className={styles.descriptionBlock}>{offre.mission_offre}</div>
                
          
                  <h2>Profil recherché</h2>
                  <div className={styles.descriptionBlock}>{offre.profil_recherch}</div>
                
            </div>
          </div>
        </div>

        {/* Informations sur l'entreprise */}
        <aside className={styles.sideCol}>
          <div className={styles.card}>
            <div className={styles.sectionHeaderBar}>
              <span className={styles.sectionTiret}>→</span>
              <h2 className={styles.sectionHeaderText}>L'entreprise</h2>
            </div>
            <div className={styles.companyBoxHeader}>


              <img
                src={assets[`../assets/${offre.image}`]}
                alt={`Logo de l'entreprise ${entreprise.nom || ''}`}
              />
              <div>
                <div className={styles.tags}>
                  <span className={styles.tag}>
                    <MapPin className={styles.icon} />
                    {offre.adr_ville || ''}
                  </span>


                   <span className={styles.tag}>
                    <Calendar className={styles.icon} />
                    {offre.annee_fondation || ''}
                  </span>


                  <span className={styles.tag}>
                    <Briefcase className={styles.icon} />
                    {offre.taille ? `Plus de ${formatNombre(offre.taille)} employés` : ''}
                  </span>


                  <span className={styles.tag}>
                    {offre.chiffre_affaire ? `${formatNombre(offre.chiffre_affaire)} €` : ''}
                  </span>

                  <p><a href="#">Voir les offres de cette entreprise</a></p>

                  <div className={styles.QuéstCe}>
                    <h2>Qui sommes-nous ?</h2>
                    <p>{offre.descriptionEntreprise}</p>
                  </div>

              
                  <h2>Vos avantages</h2>
                  <div className={styles.descriptionBlock}>{offre.avantages}</div>
             

                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default PageOffre;