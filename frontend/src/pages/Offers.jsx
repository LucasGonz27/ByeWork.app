import { useEffect, useState } from "react";
import styles from "./Offers.module.css";
import SearchBar from "../components/SearchBar";
import CompanyIcon from "../assets/corporate-icon.svg";
import { Calendar, FileText, MapPin, Briefcase, Euro } from "lucide-react";
import { formatNombre } from "../utils/formatNombre";

export default function Offres() {
  const [offres, setOffres] = useState([]);
  const [filteredOffres, setFilteredOffres] = useState([]);
  const [typeContrat, setTypeContrat] = useState("");
  const [lieu, setLieu] = useState("");
  const [entreprise, setEntreprise] = useState("");
  const [niveauEtude, setNiveauEtude] = useState("");
  const [domaineActivite, setDomaineActivite] = useState("");
  const [experienceRequise, setExperienceRequise] = useState("");
  const [salaireMin, setSalaireMin] = useState("");
  const [salaireMax, setSalaireMax] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [nbOffres, setNbOffres] = useState(0);



  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const url = "http://localhost:5000/ApiByeWork/offres";
        const fetcher = await fetch(url);
        const json = await fetcher.json();
        if (json.success) {
          setOffres(json.data);
          setFilteredOffres(json.data);
          setNbOffres(json.count);
        } else {
          console.error("Erreur API:", json.message);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des offres:", error);
      }
    };
    fetchOffres();
  }, []);


  useEffect(() => {
    let filtreOffre = offres;
    
      if (searchTerm) {
        // Supprimer les accents de la recherche
        const searchLower = searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        filtreOffre = filtreOffre.filter((offre) => {
      
          // Liste des champs à vérifier pour la recherche
          const fieldsToSearch = [
            offre.titre,
            offre.nomEntreprise,
            offre.description,
            offre.lieu,
            offre.domaineActivite,
            offre.type_contrat,
            offre.niveau_etude,
            offre.experience_requise,
            offre.tags,
            offre.salaire_min?.toString(),
            offre.salaire_max?.toString(),
            offre.date_publi
          ];
          
          return fieldsToSearch.some(field => 
            field && field.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchLower)
          );
        });
      }

    if (typeContrat)
      filtreOffre = filtreOffre.filter(
        (offre) => offre.type_contrat === typeContrat
      );

    if (lieu)
      filtreOffre = filtreOffre.filter((offre) => offre.lieu === lieu);

    if (entreprise)
      filtreOffre = filtreOffre.filter(
        (offre) => offre.nomEntreprise === entreprise
      );

    if (niveauEtude)
      filtreOffre = filtreOffre.filter(
        (offre) => offre.niveau_etude === niveauEtude
      );

    if (domaineActivite)
      filtreOffre = filtreOffre.filter(
        (offre) => offre.domaineActivite === domaineActivite
      );

    if (experienceRequise)
      filtreOffre = filtreOffre.filter(
        (offre) => offre.experience_requise === experienceRequise
      );

    if (salaireMin !== "") {
      const min = Number(salaireMin);
      if (!isNaN(min)) {
        filtreOffre = filtreOffre.filter(
          (offre) => Number(offre.salaire_min) >= min
        );
      }
    }

    if (salaireMax !== "") {
      const max = Number(salaireMax);
      if (!isNaN(max)) {
        filtreOffre = filtreOffre.filter(
          (offre) => Number(offre.salaire_max) <= max
        );
      }
    }

    //filtre pour la recherche 
    setFilteredOffres(filtreOffre);
  }, [
    typeContrat,
    lieu,
    entreprise,
    niveauEtude,
    domaineActivite,
    experienceRequise,
    salaireMin,
    salaireMax,
    searchTerm,
    offres,
  ]);

  const typesContrat = Array.from(new Set(offres.map((o) => o.type_contrat)));
  const lieux = Array.from(new Set(offres.map((o) => o.lieu)));
  const entreprises = Array.from(new Set(offres.map((o) => o.nomEntreprise)));
  const niveauxEtude = Array.from(new Set(offres.map((o) => o.niveau_etude)));
  const domainesActivite = Array.from(
    new Set(offres.map((o) => o.domaineActivite))
  );
  const experiencesRequises = Array.from(
    new Set(offres.map((o) => o.experience_requise))
  );
  const salairesMin = Array.from(
    new Set(offres.map((o) => o.salaire_min))
  ).sort((a, b) => a - b);
  const salairesMax = Array.from(
    new Set(offres.map((o) => o.salaire_max))
  ).sort((a, b) => a - b);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trouve ton futur job</h1>

      <div className={styles.searchBar}>
        <SearchBar 
          onSearch={setSearchTerm}
          placeholder="Rechercher une offre..."
        />
      </div>

      {/* Filtres */}
      <div className={styles.filters}>
        <select
          value={typeContrat}
          onChange={(e) => setTypeContrat(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">Tous les contrats</option>
          {typesContrat.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={lieu}
          onChange={(e) => setLieu(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">Tous les lieux</option>
          {lieux.map((lieu) => (
            <option key={lieu} value={lieu}>
              {lieu}
            </option>
          ))}
        </select>

        <select
          value={entreprise}
          onChange={(e) => setEntreprise(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">Toutes les entreprises</option>
          {entreprises.map((entreprise) => (
            <option key={entreprise} value={entreprise}>
              {entreprise}
            </option>
          ))}
        </select>

        <select
          value={niveauEtude}
          onChange={(e) => setNiveauEtude(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">Tous les niveaux d'étude</option>
          {niveauxEtude.map((niveau) => (
            <option key={niveau} value={niveau}>
              {niveau}
            </option>
          ))}
        </select>

        <select
          value={domaineActivite}
          onChange={(e) => setDomaineActivite(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">Tous les domaines d'activité</option>
          {domainesActivite.map((domaine) => (
            <option key={domaine} value={domaine}>
              {domaine}
            </option>
          ))}
        </select>

        <select
          value={experienceRequise}
          onChange={(e) => setExperienceRequise(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">Toute expérience</option>
          {experiencesRequises.map((exp) => (
            <option key={exp} value={exp}>
              {exp}
            </option>
          ))}
        </select>

        <select
          value={salaireMin}
          onChange={(e) => setSalaireMin(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">Salaire minimum</option>
          {salairesMin.map((salaire) => (
            <option key={salaire} value={salaire}>
              {formatNombre(salaire)}€
            </option>
          ))}
        </select>

        <select
          value={salaireMax}
          onChange={(e) => setSalaireMax(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">Salaire maximum</option>
          {salairesMax.map((salaire) => (
            <option key={salaire} value={salaire}>
              {formatNombre(salaire)}€
            </option>
          ))}
        </select>
      </div>

      {/* Compteur */}
      <div className={styles.count}>
        {searchTerm
          ? `${filteredOffres.length} offre${filteredOffres.length > 1 ? "s" : ""} trouvée${filteredOffres.length > 1 ? "s" : ""} pour "${searchTerm}"`
          : `${filteredOffres.length} offre${filteredOffres.length > 1 ? "s" : ""} à découvrir`}
      </div>

      {/* Résultats de recherche */}
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

      {/* Liste des offres */}
        <ul className={styles.list}>
          {filteredOffres.map((offre) => (
            <li key={offre.idOffre} className={styles.item}>
              <h2 className={styles.itemTitle}>{offre.titre}</h2>
              <div className={styles.compContainer}>
                <img
                  src={CompanyIcon}
                  alt="Icône entreprise"
                  className={styles.compIcon}
                />
                <h3 className={styles.compName}>{offre.nomEntreprise}</h3>
              </div>
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
                  <Euro className={styles.icon} />
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
              <div className={styles.description}>
                <FileText className={styles.icon} />
                <p>{offre.description}</p>
              </div>
              <div className={styles.itemFooter}>
                <p className={styles.date}>
                  <Calendar className={styles.inlineIcon} />{" "}
                  <strong>{offre.date_publi}</strong>
                </p>
                <button className={styles.consultButton}>
                  Consulter l'offre
                </button>
              </div>
            </li>
          ))}
        </ul>
    </div>
  );
}
