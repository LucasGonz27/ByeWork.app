import React, {useEffect, useRef, useState} from 'react';
import styles from './JobboardSlider.module.css';

function JobboardSlider() {
    const viewportRef = useRef(null);
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        const fetchOffres = async () => {
            try {
                const url = 'http://localhost:5000/ApiByeWork/offres';
                const res = await fetch(url);
                const json = await res.json();
                if (json.success && Array.isArray(json.data)) {
                    setOffers(json.data.slice(0, 12));
                }
            } catch (e) {

            }
        };
        fetchOffres();
    }, []);

    const scrollByViewport = (direction) => {
        if (!viewportRef.current) return;
        const delta = Math.round(viewportRef.current.clientWidth * 0.9) * direction;
        viewportRef.current.scrollBy({left: delta, behavior: 'smooth'});
    };

    return (
        <section className={styles.sliderSection}>
            <div className={styles.headerRow}>
                <h2>Les dernières offres</h2>
                <div className={styles.controls}>
                    <button aria-label="Précédent" onClick={() => scrollByViewport(-1)} className={styles.navBtn}>←
                    </button>
                    <button aria-label="Suivant" onClick={() => scrollByViewport(1)} className={styles.navBtn}>→
                    </button>
                </div>
            </div>

            <div className={styles.sliderViewport}>
                <div className={styles.sliderTrack} ref={viewportRef}>
                    {offers.map((offer) => (
                        <article key={offer.idOffre || `${offer.nomEntreprise}-${offer.titre}`} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <span className={styles.badge}>{offer.type_contrat || 'N/A'}</span>
                            </div>
                            <h3>{offer.titre}</h3>
                            <p className={styles.company}>{offer.nomEntreprise}</p>
                            <p className={styles.meta}>{offer.lieu}</p>
                            <button className={styles.cta}>
                                <a href={`/offer/${offer.idOffre}`} className={styles.textCta}>
                                    Voir l'offre
                                </a>
                            </button>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default JobboardSlider;


