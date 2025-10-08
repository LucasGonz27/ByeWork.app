import { useEffect, useState } from "react";

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
    <div style={{ fontFamily: '"Abril Fatface", serif' }}>
      <h1 style={{ 
        fontFamily: '"Abril Fatface", serif',
        fontWeight: 400,
        fontSize: '2.5rem',
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        Liste des Offres d'Emploi
      </h1>
      {offres.length === 0 ? (
        <p style={{ 
          fontFamily: '"Abril Fatface", serif',
          fontWeight: 400,
          fontSize: '1.2rem',
          textAlign: 'center',
          color: '#666'
        }}>
          Aucune offre disponible pour le moment.
        </p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {offres.map((offre) => (
            <li key={offre.idOffre} style={{ 
              marginBottom: '30px',
              padding: '20px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9'
            }}>
              <h2 style={{ 
                fontFamily: '"Abril Fatface", serif',
                fontWeight: 400,
                fontSize: '1.8rem',
                marginBottom: '15px',
                color: '#333'
              }}>
                {offre.titre}
              </h2>
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
  );
}

