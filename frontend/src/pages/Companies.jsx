import { useEffect, useState } from "react";
import styles from "./Companies.module.css";
import SearchBar from "../components/SearchBar";
import CompanyIcon from "../assets/corporate-icon.svg";
import { Calendar, FileText, MapPin, Briefcase } from "lucide-react";
import { formatNombre } from "../utils/formatNombre";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [ville, setVille] = useState("");
  const [taille, setTaille] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const url = "http://localhost:5000/ApiByeWork/entreprises";
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);

        if (json.success) {
          setCompanies(json.data);
          setFilteredCompanies(json.data); 
        } else {
          console.error("Erreur API:", json.message);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des entreprises:", error);
      }
    };
    fetchCompanies();
  }, []);


  useEffect(() => {
    let filtered = companies;

    // Filtrage par recherche textuelle - TOUS les champs (sans accents)
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      filtered = filtered.filter((company) => {
        // Recherche dans tous les champs textuels
        const fieldsToSearch = [
          company.nom,
          company.domaine_activite,
          company.description,
          company.adr_ville,
          company.adr_rue,
          company.adr_code_postal,
          company.telephone,
          company.email,
          company.site_web,
          company.taille?.toString(),
          company.chiffre_affaire?.toString(),
          company.annee_fondation?.toString(),
          company.secteur_activite,
          company.nombre_employes?.toString()
        ];
        
        return fieldsToSearch.some(field => 
          field && field.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchLower)
        );
      });
    }

    if (ville) {
      filtered = filtered.filter((company) => company.adr_ville === ville);
    }

    if (taille) {
      filtered = filtered.filter((company) => {
        const tailleValue = Number(company.taille);
        if (isNaN(tailleValue)) return false;

        if (taille === "small") return tailleValue < 50;
        if (taille === "medium") return tailleValue >= 50 && tailleValue <= 250;
        if (taille === "large") return tailleValue > 250;

        return true;
      });
    }

    setFilteredCompanies(filtered);
  }, [ville, taille, searchTerm, companies]); 

  const lieux = Array.from(new Set(companies.map((company) => company.adr_ville)));
  const tailles = [
    { label: "Petite (< 50)", value: "small" },
    { label: "Moyenne (50-250)", value: "medium" },
    { label: "Grande (> 250)", value: "large" },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trouve ta future entreprise</h1>

      <div className={styles.searchBar}>
        <SearchBar 
          onSearch={setSearchTerm}
          placeholder="Rechercher une entreprise..."
        />
      </div>

      {/* Filtres */}
      <div className={styles.filters}>
        <select
          value={ville}
          onChange={(e) => setVille(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">Toutes les villes</option>
          {lieux.map((lieu) => (
            <option key={lieu} value={lieu}>
              {lieu}
            </option>
          ))}
        </select>

        <select
          value={taille}
          onChange={(e) => setTaille(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">Toutes les tailles</option>
          {tailles.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      {/* Compteur */}
            <div className={styles.count}>
              {searchTerm
                ? `${filteredCompanies.length} entreprise${filteredCompanies.length > 1 ? "s" : ""} trouvée${filteredCompanies.length > 1 ? "s" : ""} pour "${searchTerm}"`
                : `${filteredCompanies.length} entreprise${filteredCompanies.length > 1 ? "s" : ""} à découvrir`}
            </div>

      {/* Résultats de recherche */}
            {filteredCompanies.length === 0 && (
             <div>
           
               <p className={styles.suggestion}>Suggestion de recherche :</p>
               <ul className={styles.suggestionList}>
                 <li>Vérifiez l'orthographe des mots-clés.</li>
                 <li>Essayez des termes plus généraux.</li>
                 <li>Utilisez moins de filtres pour élargir les résultats.</li>
               </ul>
             </div>
           )}


        <ul className={styles.list}>
          {filteredCompanies.map((entreprise) => (
            <li key={entreprise.idEntreprise} className={styles.item}>
              <h2 className={styles.itemTitle}>{entreprise.nom}</h2>

              <div className={styles.compContainer}>
                <img
                  src={CompanyIcon}
                  alt="Icône entreprise"
                  className={styles.compIcon}
                />
                <h3 className={styles.compName}>{entreprise.domaine_activite}</h3>
              </div>

              <div className={styles.tags}>
                <span className={styles.tag}>
                  <MapPin className={styles.icon} />
                  {entreprise.adr_ville}
                </span>
                <span className={styles.tag}>
                  <Briefcase className={styles.icon} />
                  Plus de {formatNombre(entreprise.taille)} employés
                </span>
                <span className={styles.tag}>
                  {formatNombre(entreprise.chiffre_affaire)} €
                </span>
              </div>

              <div className={styles.description}>
                <FileText className={styles.icon} />
                <p>{entreprise.description}</p>
              </div>

              <div className={styles.itemFooter}>
                <p className={styles.date}>
                  <Calendar className={styles.inlineIcon} />{" "}
                  <strong>{entreprise.annee_fondation}</strong>
                </p>
                <button className={styles.consultButton}>
                  Consulter l'entreprise
                </button>
              </div>
            </li>
          ))}
        </ul>

    </div>
  );
}
