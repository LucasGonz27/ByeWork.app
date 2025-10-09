import { useEffect, useState } from "react";
import styles from "./Offers.module.css";
import SearchBar from "../components/SearchBar";

export default function Offres() {
  const [offres, setOffres] = useState([]);

  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const url = "http://localhost:5000/ApiByeWork/offres";
        const fetcher = await fetch(url);
        const json = await fetcher.json();
        if (json.success) {
          setOffres(json.data);
        } else {
          console.error("Erreur API:", json.message);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des offres:", error);
      }
    };
    fetchOffres();
  }, []);

  return (

    <>
      
      <div className={styles.container}>
        <h1 className={styles.title}>Liste des Offres d'Emploi</h1>

        <div className={styles.searchBar}>
        <SearchBar />
        </div>
        {offres.length === 0 ? (
          <p className={styles.empty}>Aucune offre disponible pour le moment.</p>
        ) : (
          <ul className={styles.list}>
            {offres.map((offre) => (
              <li key={offre.idOffre} className={styles.item}>
                <h2 className={styles.itemTitle}>{offre.titre}</h2>
                <p>
                  <strong>Lieu:</strong> {offre.lieu}
                </p>
                <p>
                  <strong>Type de contrat:</strong> {offre.type_contrat}
                </p>
                <p>
                  <strong>Salaire:</strong> {offre.salaire_min}€ - {offre.salaire_max}€
                </p>
                <p>{offre.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

