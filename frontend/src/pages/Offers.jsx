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
  const [selectedId, setSelectedId] = useState(null);
  const [selectedOffre, setSelectedOffre] = useState(null);
  const [isLoadingSelected, setIsLoadingSelected] = useState(false);
  const assets = import.meta.glob('../assets/*', { eager: true, query: '?url', import: 'default' });

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

  const handleSelectOffre = (id) => {
    if (selectedId === id) {
      // Si on clique sur le même item, on ferme les détails
      setSelectedId(null);
      setSelectedOffre(null);
    } else {
      // Sinon on ouvre les détails du nouvel item
      setSelectedId(id);
    }
  };

  useEffect(() => {
    if (!selectedId) {
      setSelectedOffre(null);
      return;
    }
    let isCancelled = false;
    const fetchOffreSelectionnee = async () => {
      try {
        setIsLoadingSelected(true);
        const url = `http://localhost:5000/ApiByeWork/offres/id/${selectedId}`;
        const fetcher = await fetch(url);
        const json = await fetcher.json();
        if (!isCancelled) {
          if (json.success) {
            setSelectedOffre(json.data);
          } else {
            console.error("Erreur API:", json.message);
            setSelectedOffre(null);
          }
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("Erreur lors de la récupération de l'offre:", error);
          setSelectedOffre(null);
        }
      } finally {
        if (!isCancelled) setIsLoadingSelected(false);
      }
    };
    fetchOffreSelectionnee();
    return () => { isCancelled = true; };
  }, [selectedId]);

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
        ].some((f) => (f ?? "").toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(term))
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

      {/* split layout: liste à gauche, détails en dessous*/}
      <div className={styles.split}>
        <div className={styles.leftCol}>
          {/* liste des offres */}
          <ul className={styles.list}>
            {paginatedOffres.map(offre => (
              <li key={offre.idOffre} className={`${styles.item} ${selectedId === offre.idOffre ? styles.selected : ''}`}>
                <h2 className={styles.itemTitle}>{offre.titre}</h2>
                 <div className={styles.compContainer}>
                 <img
                src={assets[`../assets/${offre.image}`]}
               
              />

                 </div>
                <div className={styles.tags}>
                  <span className={styles.tag}><MapPin className={styles.icon} />{offre.lieu}</span>
                  <span className={styles.tag}><Briefcase className={styles.icon} />{offre.type_contrat}</span>
                  <span className={styles.tag}>{formatNombre(offre.salaire_min)}€ - {formatNombre(offre.salaire_max)}€</span>
                  {offre.tags?.split(",").slice(0, 8).map((t, i) => <span key={i} className={styles.tag}>{t.trim()}</span>)}
                </div>
                <div className={styles.description}>
                  <FileText className={styles.icon} />
                  <p>{offre.description}</p>
                </div>
                <div className={styles.itemFooter}>
                  <p className={styles.date}><Calendar className={styles.inlineIcon} /> <strong>{offre.date_publi}</strong></p>
                  <button className={styles.consultButton} onClick={() => handleSelectOffre(offre.idOffre)}>
                    Voir les détails de l'offre
                  </button>
                </div>
                
                {/* Détails sous l'item sur mobile */}
                {selectedId === offre.idOffre && selectedOffre && (
                  <div className={styles.itemDetails}>
                    <h3 className={styles.detailsTitle}></h3>
                    <div className={styles.detailsSection}>
                      <h4>Le poste</h4>
                      <div className={styles.descriptionBlock}>{selectedOffre.description_poste || selectedOffre.description}</div>
                    </div>
                    <div className={styles.detailsSection}>
                      <h4>Vos missions</h4>
                      <div className={styles.descriptionBlock}>
                        <ul>
                          {selectedOffre.mission_offre?.split('\n').filter(mission => mission.trim()).map((mission, index) => (
                            <li key={index}>{mission.trim()}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className={styles.detailsSection}>
                      <h4>Profil recherché</h4>
                      <div className={styles.descriptionBlock}>{selectedOffre.profil_recherch}</div>
                    </div>
                    <div className={styles.detailsActions}>
                      <a href={`/postuler?offre=${selectedId}`}><button className={styles.primaryBtn}>Postuler</button></a>
                      <button className={styles.secondaryBtn}>Sauvegarder</button>
                    </div>
                  </div>
                )}
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

        <aside className={styles.rightCol}>
          

          {selectedId && (
            <div className={styles.detailsCard}>
              {isLoadingSelected && <div className={styles.loading}>Chargement...</div>}
              {!isLoadingSelected && selectedOffre && (
                <div className={styles.detailsBody}>
                  <h2 className={styles.detailsTitle}>{selectedOffre.titre}</h2>
                  <div className={styles.image}>
                    <img src={"../src/assets/" + selectedOffre.image} alt="Icône entreprise" />
                  </div>
                 
                  <div className={styles.tags}>
                    <span className={styles.tag}><MapPin className={styles.icon} />{selectedOffre.lieu}</span>
                    <span className={styles.tag}><Briefcase className={styles.icon} />{selectedOffre.type_contrat}</span>
                    <span className={styles.tag}><Euro className={styles.icon} />{formatNombre(selectedOffre.salaire_min)}€ - {formatNombre(selectedOffre.salaire_max)}€</span>
                    {selectedOffre.tags?.split(",").slice(0, 8).map((t, i) => <span key={i} className={styles.tag}>{t.trim()}</span>)}
                    <div className={styles.detailsActions}>
                    <a href={`/postuler?offre=${selectedId}`}><button className={styles.primaryBtn}>Postuler</button></a>
                    <button className={styles.secondaryBtn}>Sauvegarder</button>
                  </div>
                  </div>
                  <div className={styles.detailsSection}>
                    <h3>Le poste</h3>
                    <div className={styles.descriptionBlock}>{selectedOffre.description_poste || selectedOffre.description}</div>
                  </div>
                  <div className={styles.detailsSection}>
                    <h3>Vos missions</h3>
                    <div className={styles.descriptionBlock}>
                      <ul>
                        {selectedOffre.mission_offre?.split('\n').filter(mission => mission.trim()).map((mission, index) => (
                          <li key={index}>{mission.trim()}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className={styles.detailsSection}>
                    <h3>Profil recherché</h3>
                    <div className={styles.descriptionBlock}>{selectedOffre.profil_recherch}</div>
                  </div>
                  
                </div>
              )}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
