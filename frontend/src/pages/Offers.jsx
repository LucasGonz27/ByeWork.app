import { useEffect, useState } from "react";
import styles from "./Offers.module.css"; 
import SearchBar from "../components/SearchBar"; 
import CompanyIcon from "../assets/corporate-icon.svg"; 
import { Calendar, FileText, MapPin, Briefcase, Euro } from "lucide-react"; 
import { formatNombre } from "../utils/formatNombre"; 

const OFFRES_PAR_PAGE = 8; 

export default function Offres() {

  const [offres, setOffres] = useState([]); // toutes les offres qu'on récupère
  const [filteredOffres, setFilteredOffres] = useState([]); // offres après filtre/recherche
  const [filters, setFilters] = useState({ 
    typeContrat: "",
    lieu: "",
    entreprise: "",
    niveauEtude: "",
    domaineActivite: "",
    experienceRequise: "",
    salaireMin: "",
    salaireMax: "",
  });
  const [searchTerm, setSearchTerm] = useState(""); // ce que je tape dans la barre de recherche
  const [page, setPage] = useState(1); 

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
        console.error("Erreur fetch offres:", error); 
      }
    };
    fetchOffres();
  }, []);

  // quand je filtre ou cherche je mets a jour les offres
  useEffect(() => {
    let result = offres; 

    // filtrage par recherche texte
    if (searchTerm) {
      const term = searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // enlever accents
      result = result.filter((offre) =>
        [
          offre.titre,
          offre.nomEntreprise,
          offre.lieu,
          offre.domaineActivite,
          offre.type_contrat,
          offre.niveau_etude,
          offre.experience_requise,
          offre.tags,
          offre.salaire_min?.toString(),
          offre.salaire_max?.toString(),
          offre.date_publi,
        ].some(() => f?.toString().toLowerCase().normalize("NFD").includes(term)) // si un champ contient le terme
      );
    }

    // filtrage classique avec tous les filtres
    Object.entries(filters).forEach(([key, value]) => {
      if (value) { // si le filtre est actif
        if (key === "salaireMin") result = result.filter(o => Number(o.salaire_min) >= Number(value)); // min salaire
        else if (key === "salaireMax") result = result.filter(o => Number(o.salaire_max) <= Number(value)); // max salaire
        else { 
          // pour les autres filtres, on map le nom du filtre au champ de l'objet offre
          const fieldMap = {
            typeContrat: "type_contrat",
            lieu: "lieu",
            entreprise: "nomEntreprise",
            niveauEtude: "niveau_etude",
            domaineActivite: "domaineActivite",
            experienceRequise: "experience_requise",
          };
          result = result.filter(o => o[fieldMap[key]] === value); // filtrage exact
        }
      }
    });

    setFilteredOffres(result); // on met à jour les offres filtrées
    setPage(1); 
  }, [searchTerm, filters, offres]);

  // Pagination
  const totalPages = Math.ceil(filteredOffres.length / OFFRES_PAR_PAGE); // combien de pages on a
  const paginatedOffres = filteredOffres.slice((page - 1) * OFFRES_PAR_PAGE, page * OFFRES_PAR_PAGE); // offres de la page

  // On récupère toutes les valeurs uniques pour les filtres
  const getUnique = (field) => Array.from(new Set(offres.map(o => o[field]))).sort(); // genre tous les lieux uniques
  const typesContrat = getUnique("type_contrat");
  const lieux = getUnique("lieu");
  const entreprises = getUnique("nomEntreprise");
  const niveauxEtude = getUnique("niveau_etude");
  const domainesActivite = getUnique("domaineActivite");
  const experiencesRequises = getUnique("experience_requise");
  const salairesMin = getUnique("salaire_min");
  const salairesMax = getUnique("salaire_max");

  return (
    <div className={styles.container}>
      {/* titre */}
      <h1 className={styles.title}>Trouve ton futur job</h1>

      {/* barre de recherche */}
      <div className={styles.searchBar}>
        <SearchBar onSearch={setSearchTerm} placeholder="Rechercher une offre..." />
      </div>

      {/* filtres */}
      <div className={styles.filters}>
        {[ // on boucle sur tous les filtres pour générer les select
          { value: filters.typeContrat, setter: "typeContrat", options: typesContrat, placeholder: "Tous les contrats" },
          { value: filters.lieu, setter: "lieu", options: lieux, placeholder: "Tous les lieux" },
          { value: filters.entreprise, setter: "entreprise", options: entreprises, placeholder: "Toutes les entreprises" },
          { value: filters.niveauEtude, setter: "niveauEtude", options: niveauxEtude, placeholder: "Tous les niveaux d'étude" },
          { value: filters.domaineActivite, setter: "domaineActivite", options: domainesActivite, placeholder: "Tous les domaines d'activité" },
          { value: filters.experienceRequise, setter: "experienceRequise", options: experiencesRequises, placeholder: "Toute expérience" },
          { value: filters.salaireMin, setter: "salaireMin", options: salairesMin, placeholder: "Salaire minimum" },
          { value: filters.salaireMax, setter: "salaireMax", options: salairesMax, placeholder: "Salaire maximum" },
        ].map(({ value, setter, options, placeholder }) => (
          <select
            key={setter}
            value={value}
            onChange={(e) => setFilters(prev => ({ ...prev, [setter]: e.target.value }))} // update filtre
            className={styles.filterSelect}
          >
            <option value="">{placeholder}</option>
            {options.map(opt => <option key={opt} value={opt}>{typeof opt === "number" ? formatNombre(opt) + "€" : opt}</option>)}
          </select>
        ))}
      </div>

      {/* compteur d'offres */}
      <div className={styles.count}>
        {searchTerm
          ? `${filteredOffres.length} offre${filteredOffres.length > 1 ? "s" : ""} trouvée${filteredOffres.length > 1 ? "s" : ""} pour "${searchTerm}"`
          : `${filteredOffres.length} offre${filteredOffres.length > 1 ? "s" : ""} à découvrir`}
      </div>

      {/* message si rien trouvé */}
      {filteredOffres.length === 0 && (
        <div>
          <p className={styles.suggestion}>Suggestion de recherche :</p>
          <ul className={styles.suggestionList}>
            <li>Vérifiez l'orthographe des mots-clés.</li>
            <li>Essayez des termes plus généraux.</li>
            <li>Utilisez moins de filtres pour élargir les résultats.</li>
          </ul>
        </div>
      )}

      {/* liste des offres */}
      <ul className={styles.list}>
        {paginatedOffres.map(offre => (
          <li key={offre.idOffre} className={styles.item}>
            <h2 className={styles.itemTitle}>{offre.titre}</h2>
            <div className={styles.compContainer}>
              <img src={CompanyIcon} alt="Icône entreprise" className={styles.compIcon} />
              <h3 className={styles.compName}>{offre.nomEntreprise}</h3>
            </div>
            <div className={styles.tags}>
              <span className={styles.tag}><MapPin className={styles.icon} />{offre.lieu}</span>
              <span className={styles.tag}><Briefcase className={styles.icon} />{offre.type_contrat}</span>
              <span className={styles.tag}><Euro className={styles.icon} />{formatNombre(offre.salaire_min)}€ - {formatNombre(offre.salaire_max)}€</span>
              {offre.tags?.split(",").slice(0, 8).map((t, i) => <span key={i} className={styles.tag}>{t.trim()}</span>)}
            </div>
            <div className={styles.description}>
              <FileText className={styles.icon} />
              <p>{offre.description}</p>
            </div>
            <div className={styles.itemFooter}>
              <p className={styles.date}><Calendar className={styles.inlineIcon} /> <strong>{offre.date_publi}</strong></p>
              <button className={styles.consultButton}>
                <a href={`/offer/${offre.idOffre}`} className={styles.linkButton}>Consulter l'offre</a>
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className={styles.pageButton}>Précédent</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i + 1} onClick={() => setPage(i + 1)} className={`${styles.pageButton} ${page === i + 1 ? styles.activePage : ""}`}>{i + 1}</button>
          ))}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className={styles.pageButton}>Suivant</button>
        </div>
      )}
    </div>
  );
}
