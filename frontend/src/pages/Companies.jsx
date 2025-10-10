import { useEffect, useState } from "react";
import styles from "./Companies.module.css";
import SearchBar from "../components/SearchBar";
import CompanyIcon from "../assets/corporate-icon.svg";
import { Calendar, FileText, MapPin, Briefcase, Euro } from "lucide-react";

export default function Companies() {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const url = "http://localhost:5000/ApiByeWork/entreprises";
                const fetcher = await fetch(url);
                const json = await fetcher.json();
                if (json.success) {
                    setCompanies(json.data);
                } else {
                    console.error("Erreur API:", json.message);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des entreprises:", error);
            }
        };
        fetchCompanies();
    }, []);

    return (
        <> 
        <div className={styles.container}>
            <h1 className={styles.title}>Trouve ta futur Entreprise</h1>        
            <div className={styles.searchBar}>
                <SearchBar />
            </div>

            
                {companies.length === 0 ? (
                    <p className={styles.empty}>Aucune entreprise disponible pour le moment.</p>
                ) : (
                    <ul className={styles.list}>
                        {companies.map((entreprise) => (
                            <li key={entreprise.id} className={styles.item}>
                                <h2 className={styles.itemTitle}>{entreprise.nom}</h2>
                                <div className={styles.compContainer}>
                                    <img src={CompanyIcon} alt="Icône entreprise" className={styles.compIcon} />
                                    <h3 className={styles.compName}>{entreprise.nom}</h3>
                                </div>
                                <div className={styles.tags}>
                                    <span className={styles.tag}>
                                        <MapPin className={styles.icon} />
                                        {entreprise.lieu}
                                    </span>
                                    <span className={styles.tag}>
                                        <Briefcase className={styles.icon} />
                                        {entreprise.domaine}
                                    </span>
                                    <span className={styles.tag}>
                                        <Euro className={styles.icon} />
                                        {entreprise.chiffre_affaires}€
                                    </span>
                                    {/* Ajoutez ici d'autres tags si besoin */}
                                </div>
                                <div className={styles.description}>
                                    <FileText className={styles.icon} />
                                    <p>{entreprise.taille}</p>
                                </div>
                                <div className={styles.itemFooter}>
                                    <p className={styles.date}>
                                        <Calendar className={styles.inlineIcon} /> <strong>{entreprise.annee_fondation}</strong>
                                    </p>
                                    <button className={styles.consultButton}>
                                        Consulter l'offre
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}
