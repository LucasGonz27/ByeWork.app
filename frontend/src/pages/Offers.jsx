import { useEffect, useState } from "react";
import styles from "./Offers.module.css";
import SearchBar from "../components/SearchBar";
import CompanyIcon from "../assets/corporate-icon.svg";
import { Calendar, FileText, MapPin, Briefcase, Euro } from "lucide-react";

export default function Offres() {
  const [offres, setOffres] = useState([]);
  const [filteredOffres, setFilteredOffres] = useState([]);
  const [typeContrat, setTypeContrat] = useState("");
  const [lieu, setLieu] = useState("");
  const [entreprise, setEntreprise] = useState("");
  const [niveau_etude, setNiveauEtude] = useState("");
  const [domaineActivite, setDomaineActivite] = useState("");
  const [experience_requise, setExperienceRequise] = useState("");
  const [salaire_min, setSalaireMin] = useState("");
  const [salaire_max, setSalaireMax] = useState("");

  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const url = "http://localhost:5000/ApiByeWork/offres";
        const fetcher = await fetch(url);
        const json = await fetcher.json();
        if (json.success) {
          setOffres(json.data);
          setFilteredOffres(json.data);
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
    if (typeContrat) {
      filtreOffre = filtreOffre.filter((offre) => offre.type_contrat === typeContrat);
    }
    if (lieu) {
      filtreOffre = filtreOffre.filter((offre) => offre.lieu === lieu);
    }
    if (entreprise) {
      filtreOffre = filtreOffre.filter((offre) => offre.nomEntreprise === entreprise);
    }
    if (niveau_etude) {
      filtreOffre = filtreOffre.filter((offre) => offre.niveau_etude === niveau_etude);
    }
    if (domaineActivite) {
      filtreOffre = filtreOffre.filter((offre) => offre.domaineActivite === domaineActivite);
    }
    if (experience_requise) {
      filtreOffre = filtreOffre.filter((offre) => offre.experience_requise === experience_requise);
    }
    if (salaire_min) {
      filtreOffre = filtreOffre.filter((offre) => offre.salaire_min >= parseInt(salaire_min, 10));
    }
    if (salaire_max) {
      filtreOffre = filtreOffre.filter((offre) => offre.salaire_max <= parseInt(salaire_max, 10));
    }
    setFilteredOffres(filtreOffre);
  }, [typeContrat, lieu, entreprise, niveau_etude, domaineActivite, experience_requise, offres]);

  const typesContrat = Array.from(new Set(offres.map((o) => o.type_contrat)));
  const lieux = Array.from(new Set(offres.map((o) => o.lieu)));
  const entreprises = Array.from(new Set(offres.map((o) => o.nomEntreprise)));
  const niveauxEtude = Array.from(new Set(offres.map((o) => o.niveau_etude)));
  const domainesActivite = Array.from(new Set(offres.map((o) => o.domaineActivite)));
  const experiencesRequises = Array.from(new Set(offres.map((o) => o.experience_requise)));
  const salairesMin = Array.from(new Set(offres.map((o) => o.salaire_min))).sort((a, b) => a - b);
  const salairesMax = Array.from(new Set(offres.map((o) => o.salaire_max))).sort((a, b) => a - b);

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Trouve ton futur job</h1>

        <div className={styles.searchBar}>
          <SearchBar />
        </div>

        {/* Filtres */}
        <div className={styles.filters} >
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
            value={niveau_etude}
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
            value={experience_requise}
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
            value={salaire_min}
            onChange={(e) => setSalaireMin(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">Tous les salaires (MIN)</option>
            {salairesMin.map((salaire) => ( 
              <option key={salaire} value={salaire}>
                {salaire}€
              </option>
            ))}
          </select>
          <select
            value={salaire_max}
            onChange={(e) => setSalaireMax(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">Tous les salaires (MAX)</option>
            {salairesMax.map((salaire) => (
              <option key={salaire} value={salaire}>
                {salaire}€
              </option>
            ))}
          </select>
        </div>

         {filteredOffres.length === 0 ? (
          <p className={styles.empty}>Aucune offre disponible pour le moment.</p>
        ) : (
          <ul className={styles.list}>
            {filteredOffres.map((offre) => (
              <li key={offre.idOffre} className={styles.item}>
                <h2 className={styles.itemTitle}>{offre.titre}</h2>
                <div className={styles.compContainer}>
                  <img src={CompanyIcon} alt="Icône entreprise" className={styles.compIcon} />
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
                    {offre.salaire_min}€ - {offre.salaire_max}€
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
                    <Calendar className={styles.inlineIcon} /> <strong>{offre.date_publi}</strong>
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
